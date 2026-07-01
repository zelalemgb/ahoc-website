import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageShell } from '@/components/layout/page-shell';

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('nav');
  return <PageShell eyebrow="From the team" title={t('news')} />;
}
