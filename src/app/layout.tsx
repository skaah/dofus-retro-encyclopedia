import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/layout/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "DofusRetro Wiki - L'Encyclopedie de Dofus Retro",
  description:
    "L'encyclopedie communautaire de reference pour Dofus Retro. Retrouvez toutes les informations sur les equipements, armes, donjons, quetes, succes, metiers, classes et drops.",
  keywords: [
    'Dofus Retro',
    'Wiki',
    'Encyclopedie',
    'Equipements',
    'Armes',
    'Donjons',
    'Quetes',
    'MMORPG',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
