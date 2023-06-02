import Link from 'next/link';
import { MouseEventHandler } from 'react';

export default function ProfileNavItem({
  name,
  children,
  active,
  onClick,
}: {
  name: string;
  children: React.ReactNode;
  active: boolean;
  onClick: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <li
      className={`border-b-4 border-opacity-50 py-2
        ${active ? 'border-tertiary' : 'border-off-black'}`}
    >
      <Link href={`/profile/${name}`} onClick={onClick} className="flex gap-2">
        {children}
      </Link>
    </li>
  );
}
