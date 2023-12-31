import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers/Providers';
import { MediaQueryProvider } from './providers/MediaQueryProvider';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Editing tool',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className)}>
        <MediaQueryProvider>
          <Providers>{children}</Providers>
        </MediaQueryProvider>

        <div id="popover" style={{ zIndex: 100, position: 'relative' }}></div>
      </body>
    </html>
  );
}
