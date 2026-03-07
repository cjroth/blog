import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { marked } from "marked";
import { render } from "@react-email/components";
import { createElement } from "react";
import { NewsletterEmail } from "../emails/newsletter";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
const RESEND_FROM = process.env.RESEND_FROM ?? "Chris Roth <chris@blog.cjroth.com>";

if (!RESEND_API_KEY) {
  console.error("Missing RESEND_API_KEY env var");
  process.exit(1);
}
if (!RESEND_AUDIENCE_ID) {
  console.error("Missing RESEND_AUDIENCE_ID env var");
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
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      meta[key] = val;
    }
  }
  return { meta, body: match[2] };
}

function mdxToHtml(mdx: string): string {
  const md = mdx
    .replace(/<div[^>]*>/g, "")
    .replace(/<\/div>/g, "")
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, "[$2]($1)")
    .replace(/<[A-Z][^/>]*\/>/g, "")
    .replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/g, "");

  return marked.parse(md, { async: false }) as string;
}

function inlineBodyStyles(html: string): string {
  return html
    .replace(/<p>/g, '<p style="color:#1a1a1a;font-size:16px;line-height:1.7;margin:16px 0;">')
    .replace(/<h2>/g, '<h2 style="color:#1a1a1a;font-size:20px;font-weight:600;margin:28px 0 12px;">')
    .replace(/<h3>/g, '<h3 style="color:#1a1a1a;font-size:18px;font-weight:600;margin:24px 0 8px;">')
    .replace(/<blockquote>/g, '<blockquote style="border-left:3px solid #d1d5db;margin:16px 0;padding-left:16px;color:#4b5563;">')
    .replace(/<pre>/g, '<pre style="background:#f3f4f6;padding:16px;border-radius:6px;overflow-x:auto;">')
    .replace(/<code>/g, '<code style="background:#f3f4f6;padding:2px 4px;border-radius:3px;font-size:14px;">')
    .replace(/<a /g, '<a style="color:#2563eb;" ')
    .replace(/<ul>/g, '<ul style="color:#1a1a1a;font-size:16px;line-height:1.7;margin:16px 0;padding-left:24px;">')
    .replace(/<ol>/g, '<ol style="color:#1a1a1a;font-size:16px;line-height:1.7;margin:16px 0;padding-left:24px;">')
    .replace(/<li>/g, '<li style="margin:4px 0;">');
}

async function resendFetch(path: string, options?: RequestInit) {
  return fetch(`https://api.resend.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
}

async function findExistingDraft(name: string): Promise<string | null> {
  const res = await resendFetch("/broadcasts?limit=100");
  if (!res.ok) return null;
  const { data } = (await res.json()) as {
    data: { id: string; status: string }[];
  };
  const drafts = data.filter((b) => b.status === "draft");
  for (const draft of drafts) {
    await new Promise((r) => setTimeout(r, 600));
    const detail = await resendFetch(`/broadcasts/${draft.id}`);
    if (!detail.ok) continue;
    const broadcast = (await detail.json()) as { name: string };
    if (broadcast.name === name) return draft.id;
  }
  return null;
}

async function upsertBroadcast(subject: string, html: string, name: string) {
  const existingId = await findExistingDraft(name);
  await new Promise((r) => setTimeout(r, 600));

  if (existingId) {
    const res = await resendFetch(`/broadcasts/${existingId}`, {
      method: "PATCH",
      body: JSON.stringify({ subject, html, from: RESEND_FROM, audience_id: RESEND_AUDIENCE_ID, name }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      console.error("Resend API error (update):", res.status, body);
      process.exit(1);
    }
    return { id: existingId, updated: true };
  }

  const res = await resendFetch("/broadcasts", {
    method: "POST",
    body: JSON.stringify({ audience_id: RESEND_AUDIENCE_ID, from: RESEND_FROM, subject, html, name }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    console.error("Resend API error (create):", res.status, body);
    process.exit(1);
  }
  const { id } = (await res.json()) as { id: string };
  return { id, updated: false };
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

const formattedDate = date
  ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  : "";

console.log(`Title: ${title}`);
console.log(`Date: ${formattedDate}`);
console.log(`URL: ${postUrl}`);

const EMAIL_CUTOFF = "<!-- Email Cutoff -->";
const emailBody = body.includes(EMAIL_CUTOFF) ? body.split(EMAIL_CUTOFF)[0] : body;
const bodyHtml = inlineBodyStyles(mdxToHtml(emailBody));

const emailHtml = await render(
  createElement(NewsletterEmail, {
    title,
    date: formattedDate,
    postUrl,
    bodyHtml,
  })
);

const { id, updated } = await upsertBroadcast(title, emailHtml, `${slug}`);
console.log(`\nBroadcast ${updated ? "updated" : "created"} (draft): ${id}`);
console.log("Go to https://resend.com/broadcasts to review and send.");
