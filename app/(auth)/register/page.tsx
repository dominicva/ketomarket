import { Suspense } from 'react';
import SignupForm from '@/components/auth/SignupForm';
import RegisterSkeleton from '@/components/skeletons/RegisterSkeleton';

export default function Register() {
  return (
    <div>
      <Suspense fallback={<RegisterSkeleton />}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
