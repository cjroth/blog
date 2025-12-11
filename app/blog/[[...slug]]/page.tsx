import { getPageImage, source } from "@/lib/source";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import Link from "next/link";

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
            <article
              key={page.url}
              className="group relative border-b pb-8 last:border-0"
            >
              <Link href={page.url} className="block space-y-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {page.data.date && (
                    <time dateTime={new Date(page.data.date).toISOString()}>
                      {new Date(page.data.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                  {page.data.title}
                </h2>

                {page.data.description && (
                  <p className="text-muted-foreground line-clamp-2">
                    {page.data.description}
                  </p>
                )}

                <div className="flex items-center text-sm font-medium text-primary">
                  Read more
                  <svg
                    className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            </article>
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
            {page.data.author && (
              <span className="font-medium">{page.data.author}</span>
            )}
            {page.data.date && (
              <>
                <span>•</span>
                <time dateTime={new Date(page.data.date).toISOString()}>
                  {new Date(page.data.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </>
            )}
            {page.data.tags && page.data.tags.length > 0 && (
              <>
                <span>•</span>
                <div className="flex gap-2">
                  {page.data.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium"
                    >
                      {tag}
                    </span>
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
