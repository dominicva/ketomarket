import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CheckCircle } from 'react-feather';
import sgMail from '@sendgrid/mail';
import { prisma } from '@/lib/db';
import { getCartData } from '@/lib/cart';
import Card from '@/components/Card';
import { Button } from '@/components/buttons';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function Success({
  params,
}: {
  params: { cartId: string };
}) {
  const {
    data: { cart, cartTotal },
  } = await getCartData();

  if (cart?.id !== params.cartId) {
    redirect('/checkout');
  }

  let user;
  let newOrder;
  let emailData;

  try {
    newOrder = await prisma.order.create({
      data: {
        userId: cart.userId,
        orderItems: {
          create: cart.cartItems.map(item => ({
            quantity: item.quantity,
            productId: item.productId,
            price: item.product.price,
          })),
        },
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    await prisma.cart.delete({
      where: {
        id: cart.id,
      },
    });

    user = await prisma.user.findUnique({
      where: {
        id: cart.userId,
      },
    });

    emailData = {
      to: user?.email,
      from: 'dominicvana@gmail.com',
      templateId: 'd-b9577c198f73411b8d45cfaf1414377a',
      subject: 'Order confirmed',
      dynamicTemplateData: {
        name: `${user?.name}`,
        order_id: `${newOrder?.id}`,
        order_date: newOrder?.createdAt.toLocaleString(),
        order_total: `$${cartTotal}`,
      },
    };

    await sgMail.send(emailData);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="m-auto max-w-xl p-4">
      <Card className="mt-6 shadow-lg">
        <h2 className="mt-12 text-center text-2xl font-semibold">Success!</h2>
        <p className="mt-2 text-center text-lg">Your order has been placed.</p>
        <div className="mt-8 flex items-center justify-center">
          <CheckCircle className="h-32 w-32 text-green-500" size="xl" />
        </div>
      </Card>
      <Card className="mt-6  shadow-lg">
        <h2 className="mt-8 text-2xl font-semibold">Order Details</h2>
        <p className="mb-4 mt-2 border-b-4 border-primary pb-4">
          An email receipt will be sent to{' '}
          <span className="block font-semibold">{user?.email}</span>
        </p>
        <div className="mt-6 flex flex-col gap-2 text-lg">
          <p>
            Order ID:{' '}
            <span className="block font-semibold">{newOrder?.id}</span>
          </p>
          <p>
            Order Date:{' '}
            <span className="block font-semibold">
              {newOrder?.createdAt.toLocaleString()}
            </span>
          </p>
          <p className="mt-6 font-bold">
            Order Total: <span className="ml-2">${cartTotal.toFixed(2)}</span>
          </p>
        </div>
      </Card>

      <Link href="/home">
        <Button size="large" className="m-auto mt-8 block w-11/12">
          Back to store
        </Button>
      </Link>
    </div>
  );
}
