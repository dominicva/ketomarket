import { Suspense } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import SigninSkeleton from '@/components/skeletons/SigninSkeleton';

export default function Signin() {
  return (
    <div>
      <Suspense fallback={<SigninSkeleton />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
