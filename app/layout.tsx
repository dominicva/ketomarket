import './globals.css';
import { NextAuthProvider } from './providers';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import type { ServerSession } from '@/types/ServerSession';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ketomarket',
  description: 'Highest quality keto groceries',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: ServerSession = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Header session={session} />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
