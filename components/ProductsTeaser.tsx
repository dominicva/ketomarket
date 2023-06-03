import Image from 'next/image';
import { ChevronRight } from 'react-feather';
import parmesan from '../public/parmesan.png';
import eggs from '../public/eggs.png';
import broccoli from '../public/broccoli.png';
import pecans from '../public/pecans.png';

export default function ProductsTeaser() {
  return (
    <section className="p-4">
      <h2 className="mt-4 px-4 text-center text-2xl font-bold">
        Log in to order from our collection of{' '}
        <span className="text-tertiary">keto-friendly</span> products
      </h2>
      <div className="mt-8">
        <ul className="flex flex-col gap-6">
          <li className="flex items-center gap-4">
            <Image
              src={parmesan}
              alt="parmesan"
              width={64}
              height={64}
              className="rounded-full"
            />
            <hgroup className="mr-auto">
              <h3 className="text-lg font-semibold">Parmesan</h3>
              <p className="text-sm">
                Simply delicious{' · '}
                <span className="font-semibold text-tertiary">$7.99</span>
              </p>
            </hgroup>
            <ChevronRight className="opacity-50" />
          </li>
          <li className="flex items-center gap-4">
            <Image
              src={eggs}
              alt="eggs"
              width={64}
              height={64}
              className="rounded-full"
            />
            <hgroup className="mr-auto">
              <h3 className="text-lg font-semibold">Eggs</h3>
              <p className="text-sm">
                Simply delicious{' · '}
                <span className="font-semibold text-tertiary">$4.99</span>
              </p>
            </hgroup>
            <ChevronRight className="opacity-50" />
          </li>
          <li className="flex items-center gap-4">
            <Image
              src={broccoli}
              alt="broccoli"
              width={64}
              height={64}
              className="rounded-full"
            />
            <hgroup className="mr-auto">
              <h3 className="text-lg font-semibold">Broccoli</h3>
              <p className="text-sm">
                Simply delicious{' · '}
                <span className="font-semibold text-tertiary">$2.99</span>
              </p>
            </hgroup>
            <ChevronRight className="opacity-50" />
          </li>
          <li className="flex items-center gap-4">
            <Image
              src={pecans}
              alt="pecans"
              width={64}
              height={64}
              className="rounded-full"
            />
            <hgroup className="mr-auto">
              <h3 className="text-lg font-semibold">Pecans</h3>
              <p className="text-sm">
                Simply delicious{' · '}
                <span className="font-semibold text-tertiary">$4.99</span>
              </p>
            </hgroup>
            <ChevronRight className="opacity-50" />
          </li>
        </ul>
      </div>
    </section>
  );
}
