import Link from "next/link";
import Image from "next/image";
import { SiGithub, SiLinkedin, SiThreads } from "react-icons/si";
import { HiMail } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

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
    <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-6">
      <div className="w-full max-w-2xl space-y-8">
        <div className="flex flex-col sm:flex-row gap-8 items-center">
          {/* Profile Avatar */}
          <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src="/avatar.jpg"
              alt="Chris Roth"
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center sm:text-left flex flex-col h-28 space-y-3">
            {/* Name */}
            <h1 className="text-4xl font-semibold font-heading leading-none">
              Chris Roth
            </h1>

            {/* Title */}
            <p className="text-lg text-muted-foreground">
              Software Engineer + Product Manager
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
        <p className="text-lg text-muted-foreground max-w-xl">
          Design-obsessed software engineer with a tendency to wander into
          product management. I'm passionate about creating well-designed, fast,
          and secure technology that makes people's lives better.
        </p>

        {/* Call to Action */}
        <Button asChild size="lg" className="w-fit rounded-full">
          <Link href="/docs" className="flex items-center gap-2">
            Read my writing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
