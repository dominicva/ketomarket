import { CartItem } from './CartItem';
import type { CartItemWithProduct, CartWithItemsAndProducts } from '@/types';

export function CartItemsList({
  cart,
}: {
  cart: CartWithItemsAndProducts | null;
}) {
  return (
    <ul>
      {cart?.cartItems.length ? (
        cart.cartItems.map((cartItem: CartItemWithProduct) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))
      ) : (
        <p className="mt-6 text-lg">No items in cart 😞</p>
      )}
    </ul>
  );
}
