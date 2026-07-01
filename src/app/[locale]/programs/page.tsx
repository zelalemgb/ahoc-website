import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageShell } from '@/components/layout/page-shell';

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('nav');
  return <PageShell eyebrow="Programming" title={t('programs')} />;
}
