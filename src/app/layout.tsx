import type { ReactNode } from 'react';
import './globals.css';

// The locale-specific <html> shell lives in app/[locale]/layout.tsx.
// This root layout only passes children through so that next-intl can
// set the correct lang/dir per request.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
