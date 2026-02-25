import Link from "next/link";
import Image from "next/image";
import { SiGithub, SiLinkedin, SiThreads } from "react-icons/si";
import { HiMail } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { source } from "@/lib/source";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/cjroth",
    icon: <SiGithub className="w-5 h-5" />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/chrisrxth",
    icon: <SiLinkedin className="w-5 h-5" />,
  },
  {
    name: "Threads",
    href: "https://www.threads.com/@imaginaryllc",
    icon: <SiThreads className="w-5 h-5" />,
  },
  {
    name: "Email",
    href: "mailto:hi@cjroth.com",
    icon: <HiMail className="w-5 h-5" />,
  },
];

function getRecentPosts(count: number) {
  const pages = source.getPages().filter((page) => page.url !== "/blog");
  return pages
    .sort((a, b) => {
      const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
      const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, count);
}

export default function HomePage() {
  const recentPosts = getRecentPosts(5);

  return (
    <main className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="max-w-2xl mx-auto px-6 py-24 sm:py-32">
          <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
            {/* Profile Avatar */}
            <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 ring-1 ring-border shadow-sm">
              <Image
                src="/avatar.jpg"
                alt="Chris Roth"
                width={112}
                height={112}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <div className="text-center sm:text-left space-y-3">
              {/* Name */}
              <h1 className="text-4xl sm:text-5xl font-semibold font-heading tracking-tight">
                Chris Roth
              </h1>

              {/* Title */}
              <p className="text-lg text-muted-foreground">
                AI Engineering, Product, & Design
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4 justify-center sm:justify-start">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-xl mt-10 leading-relaxed">
            Design-obsessed software engineer with a tendency to wander into
            product management. I'm passionate about creating well-designed, fast,
            and secure technology that makes people's lives better.
          </p>

          {/* Call to Action */}
          <div className="flex gap-3 mt-8">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/blog" className="flex items-center gap-2">
                Blog
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link href="/projects" className="flex items-center gap-2">
                Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
      </section>

      {/* Recent Posts */}
      <section className="border-t">
        <div className="max-w-2xl mx-auto px-6 py-16 sm:py-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-semibold font-heading tracking-tight">
              Latest Thinking
            </h2>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-1">
            {recentPosts.map((post) => (
              <Link
                key={post.url}
                href={post.url}
                className="group flex items-baseline justify-between gap-4 py-3 -mx-3 px-3 rounded-lg hover:bg-accent transition-colors"
              >
                <span className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                  {post.data.title}
                </span>
                {post.data.date && (
                  <time
                    dateTime={new Date(post.data.date).toISOString()}
                    className="text-sm text-muted-foreground shrink-0 tabular-nums"
                  >
                    {new Date(post.data.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
