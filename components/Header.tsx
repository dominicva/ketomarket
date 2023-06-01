import { Comfortaa } from 'next/font/google';
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from './Buttons';

const comfortaa = Comfortaa({ subsets: ['latin'] });

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className="flex items-center justify-between p-4">
      <h1
        className={`${comfortaa.className} text-2xl font-semibold text-secondary`}
      >
        Ketomarket
      </h1>
      <div>
        {isLoggedIn ? (
          <>
            <LogoutButton />
            <ProfileButton />
          </>
        ) : (
          <>
            <LoginButton />
            <RegisterButton />
          </>
        )}
      </div>
    </header>
  );
}
