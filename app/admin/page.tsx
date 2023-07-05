import AdminCheck from '@/components/auth/AdminCheck';

export default function AdminPage() {
  return (
    <main className="p-4">
      <AdminCheck adminPassword={process.env.ADMIN_SECRET!} />
    </main>
  );
}
