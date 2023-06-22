import Card from '@/components/Card';

export default function ProductSkeleton() {
  return (
    <Card className="bg -off-white relative">
      <div className="flex animate-pulse flex-col gap-2">
        <div className="h-4 w-3/4 rounded bg-gray-300"></div>
        <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        <div className="h-4 w-1/3 rounded bg-gray-300"></div>
        <div className="h-4 w-2/3 rounded bg-gray-300"></div>
        <div className="h-4 w-1/4 rounded bg-gray-300"></div>

        <div className="absolute right-4 top-4 mt-4 flex gap-2">
          <div className="h-4 w-3/4 rounded bg-gray-300"></div>
          <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        </div>
      </div>
    </Card>
  );
}
