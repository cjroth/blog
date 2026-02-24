import { source } from "@/lib/source";
import { ArticleCard } from "@/components/article-card";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function TagPage(props: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await props.params;
  const decodedTag = decodeURIComponent(tag);

  const pages = source
    .getPages()
    .filter(
      (page) =>
        page.url !== "/blog" &&
        page.data.tags?.some(
          (t) => t.toLowerCase() === decodedTag.toLowerCase(),
        ),
    )
    .sort((a, b) => {
      const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
      const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
      return dateB - dateA;
    });

  if (pages.length === 0) notFound();

  return (
    <main className="container max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <div className="mb-12">
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          &larr; All posts
        </Link>
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mt-6">
          Tagged
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-1">
          {decodedTag}
        </h1>
        <p className="text-muted-foreground mt-2">
          {pages.length} {pages.length === 1 ? "post" : "posts"}
        </p>
      </div>

      <div className="space-y-8">
        {pages.map((page) => (
          <ArticleCard
            key={page.url}
            url={page.url}
            title={page.data.title}
            description={page.data.description}
            date={page.data.date}
          />
        ))}
      </div>
    </main>
  );
}

export function generateStaticParams() {
  const pages = source.getPages().filter((page) => page.url !== "/blog");
  const tags = new Set<string>();
  for (const page of pages) {
    for (const tag of page.data.tags ?? []) {
      tags.add(tag);
    }
  }
  return Array.from(tags).map((tag) => ({ tag }));
}

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await props.params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `Posts tagged "${decodedTag}" - Chris Roth's Blog`,
    description: `Blog posts tagged with "${decodedTag}"`,
  };
}
