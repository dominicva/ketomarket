import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'react-feather';
import { capitalize } from '@/lib/strings';

export default function ProductTeaser({ product }: { product: any }) {
  return (
    <div>
      <Link href={`/product/${product.id}`}>
        <li key={product.id} className="flex items-center gap-4 shadow-sm">
          <Image
            src={String(product.image)}
            alt={product.name}
            width={64}
            height={64}
            className="h-auto rounded-md"
          />
          <hgroup className="mr-auto">
            <h3 className="text-lg font-semibold">
              {capitalize(product.name)}
            </h3>
            <p className="text-sm">
              <span className="font-semibold text-tertiary">
                ${product.price}
              </span>
            </p>
          </hgroup>
          <ChevronRight className="opacity-50" />
        </li>
      </Link>
    </div>
  );
}
