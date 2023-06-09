import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { User } from 'react-feather';

interface ProfileButtonProps {
  name: string | null;
  imageSrc: string | null;
}

export const ProfileButton = ({ name, imageSrc }: ProfileButtonProps) => {
  return (
    <Link href="/profile/cart">
      <button>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name ?? 'profile picture'}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <User />
        )}
      </button>
    </Link>
  );
};
