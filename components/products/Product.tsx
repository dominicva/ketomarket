'use client';

import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Plus } from 'react-feather';
import { capitalize } from '@/lib/strings';
import Card from '@/components/Card';
import { Button } from '@/components/buttons';
import type { ProductProps } from '@/types';

export default function Product({
  id,
  name,
  description,
  price,
  category,
}: ProductProps) {
  const router = useRouter();
  const productTitle = capitalize(name);

  // @ts-expect-error react-toastify injects closeToast() into the component
  const Msg = ({ closeToast }) => {
    return (
      <div className="flex flex-col justify-center px-4">
        <p className="font-bold">{`Added ${productTitle} to cart!`}</p>
        <Button
          intent="tertiary"
          size="small"
          className="mt-4"
          onClick={() => {
            closeToast();
            router.push('/profile/cart');
          }}
        >
          View cart
        </Button>
      </div>
    );
  };

  const notify = () =>
    // @ts-expect-error react-toastify injects props into the component
    toast(Msg, {
      type: 'success',
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });

  const addToCart = async () => {
    await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({
        productId: id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    router.refresh();
    notify();
  };

  return (
    <Card className="relative bg-off-white">
      <h3 className="text-xl">{productTitle}</h3>
      <h5 className="text-sm font-bold text-secondary">
        {capitalize(category.name)}
      </h5>
      <h4 className="mb-2 font-semibold">${price}</h4>
      <p>{description}</p>

      <Button
        intent="tertiary"
        size="small"
        className="absolute right-4 top-4 mt-4 flex gap-2"
        onClick={addToCart}
      >
        <Plus />
        Add to cart
      </Button>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Card>
  );
}
