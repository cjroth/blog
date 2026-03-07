import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { marked } from "marked";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_SEGMENT_ID = process.env.RESEND_SEGMENT_ID;
const RESEND_FROM = process.env.RESEND_FROM ?? "Chris Roth <chris@cjroth.com>";

if (!RESEND_API_KEY) {
  console.error("Missing RESEND_API_KEY env var");
  process.exit(1);
}
if (!RESEND_SEGMENT_ID) {
  console.error("Missing RESEND_SEGMENT_ID env var");
  process.exit(1);
}

const CONTENT_DIR = join(import.meta.dir, "..", "content", "docs");

function getLatestPost(): string {
  const files = readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") && f !== "index.mdx")
    .sort()
    .reverse();
  if (!files.length) {
    console.error("No blog posts found");
    process.exit(1);
  }
  return join(CONTENT_DIR, files[0]);
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    console.error("Could not parse frontmatter");
    process.exit(1);
  }
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      // strip surrounding quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      meta[key] = val;
    }
  }
  return { meta, body: match[2] };
}

function mdxToHtml(mdx: string): string {
  // Strip JSX components (self-closing and block)
  let md = mdx
    // Convert <div className="...">text</div> to just the text content
    .replace(/<div[^>]*>/g, "")
    .replace(/<\/div>/g, "")
    // Remove <a> JSX tags but keep content (marked will handle markdown links)
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, "[$2]($1)")
    // Strip any remaining self-closing JSX tags
    .replace(/<[A-Z][^/>]*\/>/g, "")
    // Strip any remaining JSX block tags
    .replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/g, "");

  const html = marked.parse(md, { async: false }) as string;
  return html;
}

function buildEmailHtml(title: string, bodyHtml: string, postUrl: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; }
    h1 { font-size: 28px; margin-bottom: 8px; }
    h2 { font-size: 22px; margin-top: 32px; }
    a { color: #2563eb; }
    blockquote { border-left: 3px solid #d1d5db; margin-left: 0; padding-left: 16px; color: #4b5563; }
    pre { background: #f3f4f6; padding: 16px; border-radius: 6px; overflow-x: auto; }
    code { background: #f3f4f6; padding: 2px 4px; border-radius: 3px; font-size: 14px; }
    pre code { background: none; padding: 0; }
    hr { border: none; border-top: 1px solid #e5e7eb; margin: 32px 0; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  ${bodyHtml}
  <p><a href="${postUrl}">Read on cjroth.com</a></p>
  <div class="footer">
    <p>You're receiving this because you subscribed at cjroth.com.</p>
    <p><a href="{{{RESEND_UNSUBSCRIBE_URL}}}">Unsubscribe</a></p>
  </div>
</body>
</html>`;
}

async function createBroadcast(subject: string, html: string, name: string) {
  const res = await fetch("https://api.resend.com/broadcasts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      segment_id: RESEND_SEGMENT_ID,
      from: RESEND_FROM,
      subject,
      html,
      name,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    console.error("Resend API error:", res.status, body);
    process.exit(1);
  }

  return (await res.json()) as { id: string };
}

// Main
const filePath = process.argv[2] ?? getLatestPost();
const resolvedPath = filePath.startsWith("/") ? filePath : join(process.cwd(), filePath);

console.log(`Reading: ${resolvedPath}`);
const raw = readFileSync(resolvedPath, "utf-8");
const { meta, body } = parseFrontmatter(raw);

const title = meta.title || "Untitled";
const date = meta.date || "";
const slug = resolvedPath.split("/").pop()?.replace(/\.mdx?$/, "") ?? "";
const postUrl = `https://cjroth.com/blog/${slug}`;

console.log(`Title: ${title}`);
console.log(`Date: ${date}`);
console.log(`URL: ${postUrl}`);

const bodyHtml = mdxToHtml(body);
const emailHtml = buildEmailHtml(title, bodyHtml, postUrl);

const { id } = await createBroadcast(title, emailHtml, `${slug}`);
console.log(`\nBroadcast created (draft): ${id}`);
console.log("Go to https://resend.com/broadcasts to review and send.");
