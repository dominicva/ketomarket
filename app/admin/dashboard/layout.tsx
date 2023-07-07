import AdminNav from '@/components/admin/AdminNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <AdminNav />
      {children}
    </main>
  );
}
