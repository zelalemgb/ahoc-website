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
  // Staff webmail lives on InMotion, not here. We point at the host's own
  // name rather than webmail.addishouseofculture.com because InMotion's
  // certificate doesn't yet cover our domain — going direct makes browsers
  // show a full-page security warning. Kept as a 307 (not 301) precisely so
  // this destination can change without browsers having cached the old one:
  // once AutoSSL issues a cert covering webmail.addishouseofculture.com,
  // swap the destination here and nothing else needs to change.
  async redirects() {
    return [
      {
        source: '/webmail',
        destination: 'https://secure347.inmotionhosting.com:2096',
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
