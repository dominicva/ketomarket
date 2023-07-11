import { verify } from 'jsonwebtoken';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export default function ResetPassword({
  params,
}: {
  params: { token: string };
}) {
  console.log('params', params);
  const { token } = params;
  const decodedToken = verify(token, process.env.PASSWORD_RESET_SECRET!);
  const { email, iat } = decodedToken as { email: string; iat: number };

  console.log('decodedToken', decodedToken);

  const tokenExpired = new Date().getTime() / 1000 - iat > 60 * 60 * 24;

  if (tokenExpired) {
    return (
      <div className="m-auto max-w-xl">
        <h2 className="mb-6 text-2xl font-semibold">
          Password reset link expired
        </h2>
      </div>
    );
  }

  return (
    <div className="m-auto max-w-xl">
      <h2 className="mb-6 text-2xl font-semibold">Reset Password</h2>
      <ResetPasswordForm email={email} />
    </div>
  );
}
