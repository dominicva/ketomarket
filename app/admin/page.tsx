import { hash } from 'bcrypt';
import AdminCheck from '@/components/auth/AdminCheck';

export default async function AdminPage() {
  const hashedPassword = await hash(process.env.ADMIN_SECRET!, 10);

  return (
    <main className="p-4">
      <AdminCheck hashedPassword={hashedPassword} />
    </main>
  );
}
