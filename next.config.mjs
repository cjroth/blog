import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/blog/building-this-blog-with-fumadocs',
        destination: '/blog/2025-12-09-building-this-blog-with-fumadocs',
        permanent: true,
      },
      {
        source: '/blog/the-malleability-of-tools',
        destination: '/blog/2026-02-04-the-malleability-of-tools',
        permanent: true,
      },
      {
        source: '/blog/2026-02-12-brainrot',
        destination: '/blog/2026-02-12-ai-cognitive-multiplier',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
