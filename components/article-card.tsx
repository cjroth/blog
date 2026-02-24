import Link from "next/link";

export function ArticleCard({
  url,
  title,
  description,
  date,
}: {
  url: string;
  title: string;
  description?: string;
  date?: string | Date;
}) {
  return (
    <article className="group relative border-b pb-8 last:border-0">
      <Link href={url} className="block space-y-3">
        {date && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={new Date(date).toISOString()}>
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight group-hover:text-primary transition-colors">
          {title}
        </h2>

        {description && (
          <p className="text-muted-foreground line-clamp-2">{description}</p>
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
  );
}
