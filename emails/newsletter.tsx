import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Img,
  Heading,
  Text,
  Link,
  Hr,
  Button,
  Tailwind,
  pixelBasedPreset,
} from "@react-email/components";

interface NewsletterEmailProps {
  title: string;
  date: string;
  postUrl: string;
  bodyHtml: string;
}

const baseURL = "https://cjroth.com";

export default function NewsletterEmail({
  title,
  date,
  postUrl,
  bodyHtml,
}: NewsletterEmailProps) {
  return (
    <Html lang="en">
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                fg: "#1a1a1a",
                muted: "#6b7280",
                border: "#e5e7eb",
                bg: "#f9fafb",
              },
            },
          },
        }}
      >
        <Head />
        <Preview>{title}</Preview>
        <Body className="bg-bg font-sans py-10">
          <Container className="max-w-[600px] mx-auto bg-white rounded-lg border-solid border border-border">
            {/* Header */}
            <Section className="px-10 pt-10 pb-6">
              <table width="100%">
                <tr>
                  <td>
                    <Link href="https://cjroth.com" className="no-underline">
                      <table>
                        <tr>
                          <td style={{ verticalAlign: "middle" }}>
                            <Img
                              src={`${baseURL}/avatar.jpg`}
                              alt="Chris Roth"
                              width="40"
                              height="40"
                              className="rounded-lg"
                            />
                          </td>
                          <td style={{ verticalAlign: "middle", paddingLeft: "12px" }}>
                            <Text className="text-fg text-base font-semibold m-0">
                              Chris Roth
                            </Text>
                          </td>
                        </tr>
                      </table>
                    </Link>
                  </td>
                  <td style={{ textAlign: "right", verticalAlign: "middle" }}>
                    <Text className="text-muted text-sm m-0">{date}</Text>
                  </td>
                </tr>
              </table>
            </Section>

            <Hr style={{ borderTop: "1px solid #e5e7eb", borderBottom: "none", borderLeft: "none", borderRight: "none", margin: 0, width: "100%" }} />

            {/* Title */}
            <Section className="px-10 pt-8 pb-2">
              <Heading className="text-fg text-2xl font-semibold m-0">
                {title}
              </Heading>
            </Section>

            {/* Body */}
            <Section className="px-10 pb-8">
              <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
            </Section>

            {/* CTA */}
            <Section className="px-10 pb-10">
              <Button
                href={postUrl}
                className="bg-fg text-white text-sm font-medium px-6 py-3 rounded-full box-border no-underline"
              >
                Read Full Version
              </Button>
            </Section>

            <Hr style={{ borderTop: "1px solid #e5e7eb", borderBottom: "none", borderLeft: "none", borderRight: "none", margin: 0, width: "100%" }} />

            {/* Footer */}
            <Section className="px-10 py-8">
              <Text className="text-muted text-xs m-0 leading-relaxed">
                You received this because you subscribed at{" "}
                <Link
                  href="https://cjroth.com"
                  className="text-muted underline"
                >
                  cjroth.com
                </Link>
                .
              </Text>
              <Text className="text-muted text-xs m-0 mt-2">
                <Link
                  href="{{{RESEND_UNSUBSCRIBE_URL}}}"
                  className="text-muted underline"
                >
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

NewsletterEmail.PreviewProps = {
  title: "Building a CLI Portfolio with Ink and React",
  date: "Mar 7, 2026",
  postUrl: "https://cjroth.com/blog/ink-portfolio",
  bodyHtml: `
    <p style="color:#1a1a1a;font-size:16px;line-height:1.7;margin:16px 0;">I've been experimenting with building terminal UIs using React and Ink. The developer experience is surprisingly good — you get components, hooks, and flexbox layout, all rendering to the terminal.</p>
    <h2 style="color:#1a1a1a;font-size:20px;font-weight:600;margin:28px 0 12px;">Why Ink?</h2>
    <p style="color:#1a1a1a;font-size:16px;line-height:1.7;margin:16px 0;">Most CLI tools are built with imperative code — print a line, read input, repeat. Ink lets you think in components instead. State changes re-render the UI, just like on the web.</p>
    <blockquote style="border-left:3px solid #d1d5db;margin:16px 0;padding-left:16px;color:#4b5563;"><p style="margin:0;">The best CLI tools feel like native apps. Ink gets you closer to that.</p></blockquote>
    <p style="color:#1a1a1a;font-size:16px;line-height:1.7;margin:16px 0;">Check out the full post for a walkthrough of the setup and some patterns I found useful.</p>
  `,
} satisfies NewsletterEmailProps;

export { NewsletterEmail };
