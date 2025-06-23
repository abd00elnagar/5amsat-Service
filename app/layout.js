import './globals.css';
import { Inter } from 'next/font/google';
import Providers from './providers';
import { config } from '@/lib/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: config.marketName || 'Market',
  description: config.brandDescription || '',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 