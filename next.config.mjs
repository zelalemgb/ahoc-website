import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Sanity-hosted image assets
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  // Silence workspace-root warning when multiple lockfiles exist on the machine.
  outputFileTracingRoot: process.cwd(),
};

export default withNextIntl(nextConfig);
