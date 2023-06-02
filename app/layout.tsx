import Header from '@/components/Header';
import './globals.css';
import { NextAuthProvider } from './providers';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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
  const session = await getServerSession(authOptions);

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
