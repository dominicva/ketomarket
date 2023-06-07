import './globals.css';
import { NextAuthProvider } from './providers';
import { getServerSession } from 'next-auth';
import { inter } from '@/lib/fonts';
import { authOptions } from '@/lib/auth';
import type { ServerSession } from '@/types/ServerSession';
import Header from '@/components/Header';

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
