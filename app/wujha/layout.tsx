import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wujha - Uptown Muscat | Redefining Lifestyle',
  description:
    'Uptown Muscat offers more than just a residence - it is a curated lifestyle experience in the heart of Knowledge Oasis Muscat.',
  keywords: 'Wujha, Uptown Muscat, Real Estate, Property, Oman, Knowledge Oasis Muscat',
};

export default function WujhaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

