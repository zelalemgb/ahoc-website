import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Archivo, Archivo_Black, Noto_Sans_Ethiopic } from 'next/font/google';

const sans = Archivo({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
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

export const metadata: Metadata = {
  title: 'Coming soon · Addis House of Culture',
  description:
    'Addis House of Culture is open in Addis Ababa, with exhibitions and events on now. Our website is coming soon.',
  robots: { index: false, follow: false },
};

export default function ComingSoonLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${ethiopic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
