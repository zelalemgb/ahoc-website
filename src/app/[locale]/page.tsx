import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/hero';
import { WhatsOn } from '@/components/sections/whats-on';
import { Statement } from '@/components/sections/statement';
import { Spaces } from '@/components/sections/spaces';
import { VisitBand } from '@/components/sections/visit-band';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <WhatsOn />
      <Statement />
      <Spaces />
      <VisitBand />
    </>
  );
}
