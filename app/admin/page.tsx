import { getUserFromDb } from '@/lib/user';
import { redirect } from 'next/navigation';
import NotAuthorized from '@/components/auth/NotAuthorized';

export default async function AdminPage() {
  const user = await getUserFromDb();

  if (user?.isAdmin) {
    redirect('/admin/dashboard');
  } else {
    return <NotAuthorized />;
  }
}
