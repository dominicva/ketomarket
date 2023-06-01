import AuthForm from '@/components/AuthForm';
import SignupForm from '@/components/SignupForm';
import { Sign } from 'crypto';

export default function Register() {
  return (
    <div>
      <SignupForm />
      {/* <AuthForm mode="register" /> */}
    </div>
  );
}
