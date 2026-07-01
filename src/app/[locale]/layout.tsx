import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Archivo, Archivo_Black, Noto_Sans_Ethiopic } from 'next/font/google';
import { routing, isValidLocale } from '@/i18n/routing';
import { Announcement } from '@/components/layout/announcement';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const sans = Archivo({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const ethiopic = Noto_Sans_Ethiopic({
  subsets: ['ethiopic'],
  weight: ['500', '700'],
  variable: '--font-ethiopic',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://addishouseofculture.com';

  return {
    metadataBase: new URL(base),
    title: {
      default: `${t('siteName')} — ${t('tagline')}`,
      template: `%s · ${t('siteName')}`,
    },
    description: t('description'),
    openGraph: {
      title: t('siteName'),
      description: t('description'),
      type: 'website',
      locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${sans.variable} ${display.variable} ${ethiopic.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider>
          <Announcement />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
