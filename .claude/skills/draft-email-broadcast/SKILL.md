---
name: draft-email-broadcast
description: Draft an email broadcast for a blog post using the React Email newsletter template and Resend API. Creates a draft broadcast on Resend for review before sending.
user_invocable: true
---

# Draft Email Broadcast

Create a draft email broadcast on Resend for a blog post.

## Steps

1. List available blog posts from `content/docs/` (excluding `index.mdx`), sorted by date (newest first).
2. If the user didn't specify a post, show the 5 most recent posts and ask which one to use.
3. Run the publish script to create a draft broadcast:
   ```sh
   bun scripts/publish-resend.ts <path-to-post>
   ```
4. Report the result — the broadcast ID and a link to review it at https://resend.com/broadcasts.

## Requirements

- The following env vars must be set (in `.env` or environment): `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`
- `RESEND_FROM` defaults to `Chris Roth <chris@blog.cjroth.com>` if not set.

## Notes

- The script renders the post through the React Email template at `emails/newsletter.tsx`.
- It creates a **draft** broadcast — it does NOT send. The user must review and send from the Resend dashboard.
- The email subject line is the post title.
- Blog post URLs follow the pattern `https://cjroth.com/blog/<slug>` where slug is the filename without date prefix and `.mdx` extension.
- If a post contains `{/* Email Cutoff */}`, only the content above that marker is included in the email. The email has a "Read Full Version" button so readers can see the rest on the blog. Place the cutoff after an engaging opening (2-4 paragraphs or first section) at a natural break point.
