import { setRequestLocale } from 'next-intl/server';
import { PageShell } from '@/components/layout/page-shell';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PageShell eyebrow="About" title="Addis House of Culture" />;
}
