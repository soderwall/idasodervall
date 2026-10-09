import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import { Suspense } from 'react';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ida Södervall Studio | Galleri & E-handel',
  description:
    'Svensk samtida konstnär. Utforska unika originalmålningar och handsignerade limited edition konstprints från ateljén i Åkarp.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="bg-[#FBF9F5] text-[#1C1A18] font-sans antialiased min-h-screen flex flex-col selection:bg-[#2A2725] selection:text-white">
        <CartProvider>
          <Suspense fallback={<div className="h-20 bg-[#FBF9F5]" />}>
            <Navigation />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
