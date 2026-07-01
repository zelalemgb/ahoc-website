import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageShell } from '@/components/layout/page-shell';

export default async function LibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('nav');
  return <PageShell eyebrow="Library & Publications" title={t('library')} />;
}
