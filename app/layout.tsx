import type { Metadata } from 'next';
import { Manrope, IBM_Plex_Sans_Arabic } from 'next/font/google';
import I18nProvider from '@/components/I18nProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import './wujha/globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-plex-arabic',
  weight: ['200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Wujha - Uptown Muscat | Redefining Lifestyle',
  description:
    'Uptown Muscat offers more than just a residence - it is a curated lifestyle experience in the heart of Knowledge Oasis Muscat.',
  keywords: 'Wujha, Uptown Muscat, Real Estate, Property, Oman, Knowledge Oasis Muscat',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${manrope.variable} ${plexArabic.variable}`}>
      <body>
        <I18nProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

