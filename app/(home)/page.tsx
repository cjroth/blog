import Link from "next/link";
import Image from "next/image";
import { SiGithub, SiLinkedin, SiThreads } from "react-icons/si";
import { HiMail } from "react-icons/hi";

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

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col sm:flex-row gap-6 mb-8 items-center sm:items-start">
          {/* Profile Avatar */}
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src="/avatar.jpg"
              alt="Chris Roth"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center sm:text-left">
            {/* Name */}
            <h1
              className="text-4xl font-semibold mb-2"
              style={{ fontFamily: "'Hubot Sans', sans-serif" }}
            >
              Chris Roth
            </h1>

            {/* Title */}
            <p className="text-lg sm:text-xl text-muted-foreground">
              Software Engineer & Product Builder
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-8 max-w-xl">
          Design-obsessed software engineer with a tendency to wander into
          product management. I build things that matter and write about what I
          learn along the way.
        </p>

        {/* Links Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-base font-medium hover:underline underline-offset-4"
          >
            Read my writing
            <svg
              className="w-4 h-4"
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
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
