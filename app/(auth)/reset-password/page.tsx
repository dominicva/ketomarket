import RequestPasswordReset from '@/components/auth/RequestPasswordReset';

export default function ResetPassword() {
  return (
    <div className="m-auto max-w-lg">
      <h2 className="mb-6 text-2xl font-semibold">Reset Password</h2>
      <RequestPasswordReset />
    </div>
  );
}
