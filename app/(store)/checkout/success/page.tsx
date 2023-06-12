import Link from 'next/link';
import { headers } from 'next/headers';
import { CheckCircle } from 'react-feather';
import Card from '@/components/Card';
import { Button } from '@/components/buttons';

export default function Success() {
  const headersList = headers();
  const referrer = headersList.get('referrer');
  console.log('referrer', referrer);
  return (
    <div className="p-4">
      <Card className="mt-8 shadow-lg">
        <h2 className="mt-12 text-center text-2xl font-semibold">Success!</h2>
        <p className="mt-2 text-center text-lg">Your order has been placed.</p>
        <div className="mt-8 flex items-center justify-center">
          <CheckCircle className="h-32 w-32 text-green-500" size="xl" />
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
