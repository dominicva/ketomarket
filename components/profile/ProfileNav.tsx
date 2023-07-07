'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { List, Settings, ShoppingCart } from 'react-feather';
import NavItem from './ProfileNavItem';

export default function ProfileNav() {
  // get the last part of the pathname
  const initial = usePathname().split('/').at(-1);
  const [active, setActive] = useState(initial);

  return (
    <nav className="my-6 flex">
      <ul className="flex gap-8">
        <NavItem
          active={active === 'cart'}
          onClick={() => setActive('cart')}
          href="/profile/cart"
        >
          <ShoppingCart />
          <span>Cart</span>
        </NavItem>
        <NavItem
          active={active === 'orders'}
          onClick={() => setActive('orders')}
          href="/profile/orders"
        >
          <List />
          <span>Orders</span>
        </NavItem>
        <NavItem
          active={active === 'settings'}
          onClick={() => setActive('settings')}
          href="/profile/settings"
        >
          <Settings />
          <span>Settings</span>
        </NavItem>
      </ul>
    </nav>
  );
}
