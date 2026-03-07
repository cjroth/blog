"use client";

import { useActionState } from "react";
import { subscribe } from "@/app/actions/subscribe";
import { Button } from "@/components/ui/button";
import { HiMail } from "react-icons/hi";

export function NewsletterSignup() {
  const [state, action, pending] = useActionState(subscribe, null);

  return (
    <div className="rounded-xl border bg-card p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-2">
        <HiMail className="w-5 h-5 text-primary" />
        <h3 className="font-semibold font-heading text-lg">Subscribe</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Get new posts delivered to your inbox.
      </p>

      {state?.success ? (
        <p className="text-sm text-primary">{state.message}</p>
      ) : (
        <form action={action} className="flex gap-2">
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            className="flex-1 min-w-0 rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="submit" disabled={pending} className="rounded-lg shrink-0">
            {pending ? "..." : "Subscribe"}
          </Button>
        </form>
      )}

      {state && !state.success && (
        <p className="text-sm text-destructive mt-2">{state.message}</p>
      )}
    </div>
  );
}
