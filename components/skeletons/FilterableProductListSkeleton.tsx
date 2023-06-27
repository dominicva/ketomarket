export default function FilterableProductListSkeleton({
  productCount,
}: {
  productCount: number;
}) {
  return (
    <div className="mt-2 flex animate-pulse flex-col gap-4 bg-gray-100 p-4">
      <div className="m-auto mb-6 flex w-full max-w-5xl flex-col gap-2 p-6">
        <div className="mb-4 h-10 w-40 rounded bg-gray-300"></div>
        <div className="mb-16 flex flex-col">
          <div className="mb-1 mt-4 h-4 w-20 animate-pulse rounded bg-gray-300"></div>
          <div className="h-10 max-w-sm animate-pulse rounded bg-gray-300"></div>
        </div>
        <div className="flex flex-wrap gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3">
          {[...Array(productCount)].map((_, i) => (
            <div key={i} className="flex basis-[47%] flex-col">
              <div className="mt-4 h-36  animate-pulse rounded bg-gray-300"></div>
              <div className="h-24 animate-pulse rounded bg-gray-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
