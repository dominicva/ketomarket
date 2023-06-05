'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { List, Settings, ShoppingCart } from 'react-feather';
import type { ServerSession } from '@/types/ServerSession';
import NavItem from './ProfileNavItem';

export default function ProfileNav({ session }: { session: ServerSession }) {
  // get the last part of the pathname
  const initial = usePathname().split('/').at(-1);
  const [active, setActive] = useState(initial);

  return (
    <nav className="my-6 flex">
      <ul className="flex gap-8">
        <NavItem
          name="cart"
          active={active === 'cart'}
          onClick={() => setActive('cart')}
        >
          <ShoppingCart />
          <span>Cart</span>
        </NavItem>
        <NavItem
          name="orders"
          active={active === 'orders'}
          onClick={() => setActive('orders')}
        >
          <List />
          <span>Orders</span>
        </NavItem>
        <NavItem
          name="settings"
          active={active === 'settings'}
          onClick={() => setActive('settings')}
        >
          <Settings />
          <span>Settings</span>
        </NavItem>
      </ul>
    </nav>
  );
}
