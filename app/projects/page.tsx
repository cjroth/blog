import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

const projects = [
  {
    name: "Ink Web",
    url: "https://www.ink-web.dev",
    description:
      "A framework for building interactive CLIs using React and Ink that run in both the browser and terminal. Wraps Ink, polyfills Node.js APIs, and integrates with Xterm.js for terminal rendering.",
    tech: ["React", "TypeScript", "CLI"],
  },
  {
    name: "Rebalance",
    url: "/blog/2026-02-27-building-an-investment-rebalancer-tui",
    description:
      "A portfolio rebalancing tool that runs as both a CLI and a browser app from the same codebase. Imports Schwab position CSVs, lets you set target allocations, and generates the exact trades needed to rebalance.",
    tech: ["React", "TypeScript", "CLI"],
  },
];

export default function ProjectsPage() {
  return (
    <main className="container max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Projects
        </h1>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => {
          const isExternal = project.url.startsWith("http");
          const Wrapper = isExternal ? "a" : Link;
          const linkProps = isExternal
            ? { href: project.url, target: "_blank" as const, rel: "noopener noreferrer" }
            : { href: project.url };
          return (
            <Wrapper
              key={project.name}
              {...linkProps}
              className="group block"
            >
              <Card className="transition-colors group-hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    {isExternal && (
                      <ArrowUpRight className="ml-auto h-5 w-5 text-muted-foreground transition-transform group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    )}
                  </div>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Wrapper>
          );
        })}
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Projects - Chris Roth",
  description: "Open source tools and experiments by Chris Roth.",
};
