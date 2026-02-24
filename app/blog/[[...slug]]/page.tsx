import { getPageImage, source } from "@/lib/source";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";

export default async function Page(props: PageProps<"/blog/[[...slug]]">) {
  const params = await props.params;

  // If no slug, show blog listing
  if (!params.slug || params.slug.length === 0) {
    const pages = source.getPages().filter((page) => {
      return page.url !== "/blog";
    });

    const sortedPages = pages.sort((a, b) => {
      const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
      const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
      return dateB - dateA;
    });

    return (
      <main className="container max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="space-y-8">
          {sortedPages.map((page) => (
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

  // Show individual blog post
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <main className="container max-w-3xl mx-auto px-4 py-12 sm:py-16">
      <article>
        {/* Blog post header */}
        <header className="mb-8 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {page.data.title}
          </h1>

          {page.data.description && (
            <p className="text-xl text-muted-foreground">
              {page.data.description}
            </p>
          )}

          {/* Blog metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b pb-6">
            {page.data.date && (
              <time dateTime={new Date(page.data.date).toISOString()}>
                {new Date(page.data.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
            {page.data.tags && page.data.tags.length > 0 && (
              <>
                <span>•</span>
                <div className="flex gap-2">
                  {page.data.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tags/${encodeURIComponent(tag)}`}
                      className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        {/* Blog post content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDX
            components={getMDXComponents({
              a: createRelativeLink(source, page),
            })}
          />
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/blog/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;

  // Metadata for blog listing
  if (!params.slug || params.slug.length === 0) {
    return {
      title: "Chris Roth's Blog",
      description: "Thoughts on software, design, and building products.",
    };
  }

  // Metadata for individual blog post
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
