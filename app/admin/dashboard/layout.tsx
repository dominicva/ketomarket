import { getUserFromDb } from '@/lib/user';
import AdminNav from '@/components/admin/AdminNav';
import NotAuthorized from '@/components/auth/NotAuthorized';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromDb();

  if (!user?.isAdmin) {
    return <NotAuthorized />;
  }

  return (
    <main>
      <AdminNav />
      {children}
    </main>
  );
}
