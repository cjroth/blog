import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import Script from 'next/script';
import './global.css';

export const metadata: Metadata = {
  title: {
    default: 'Chris Roth',
    template: '%s | Chris Roth',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="902cc0b0-0759-4e41-b653-99cf34b2fc59"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
