import './globals.css';
import { NextAuthProvider } from './providers';
import { inter } from '@/lib/fonts';
import Header from '@/components/Header';
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'Ketomarket',
  description: 'Highest quality keto groceries',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {/* @ts-expect-error Async Server Component */}
          <Header />
          {children}
        </NextAuthProvider>
        {/* For delete account confirmation in profile/settings page */}
        <div id="modal"></div>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  );
}
