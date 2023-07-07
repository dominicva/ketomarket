'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
// TODO: refactor to make ProfileNavItem name more generic
import NavItem from '../profile/ProfileNavItem';

const navItems = [
  { name: 'product', label: 'Product' },
  { name: 'category', label: 'Category' },
  { name: 'roles', label: 'Roles' },
];

export default function AdminNav() {
  const initial = usePathname().split('/').at(-1);
  const [active, setActive] = useState(initial);

  return (
    <nav className="p-4">
      <ul className="flex gap-6">
        {navItems.map(item => (
          <NavItem
            key={item.name}
            active={active === item.name}
            href={`/admin/dashboard/${item.name}`}
            onClick={() => setActive(item.name)}
          >
            {item.label}
          </NavItem>
        ))}
      </ul>
    </nav>
  );
}
