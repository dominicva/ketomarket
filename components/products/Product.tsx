import { Plus } from 'react-feather';
import { capitalize } from '@/lib/strings';
import Card from '@/components/Card';
import { Button } from '@/components/buttons';
import type { ProductWithCategory } from '@/types/ProductWithCategory';

export default function Product({
  name,
  description,
  price,
  category,
}: ProductWithCategory) {
  return (
    <Card className="relative bg-off-white">
      <h3 className="text-xl">{capitalize(name)}</h3>
      <h5 className="text-sm font-bold text-secondary">
        {capitalize(category.name)}
      </h5>
      <h4 className="mb-2 font-semibold">${price}</h4>
      <p>{description}</p>
      <Button
        intent="tertiary"
        size="small"
        className="absolute right-4 top-4 mt-4 flex gap-2"
      >
        <Plus />
        Add to cart
      </Button>
    </Card>
  );
}
