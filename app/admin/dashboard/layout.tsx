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
      <div className="m-auto max-w-2xl">
        <h2 className="px-4 text-xl font-semibold">Admin Dashboard</h2>
        <AdminNav />
        {children}
      </div>
    </main>
  );
}
