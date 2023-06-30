export default function ProductPageSkeleton() {
  return (
    <div className="m-auto mt-4 max-w-2xl px-12 py-10">
      <div className="m-auto h-48 w-full animate-pulse rounded bg-gray-300 p-4"></div>
      <div className="mb-1 mt-4 h-8 w-24 animate-pulse rounded bg-gray-300"></div>
      <div className="mt-8">
        <div className="mb-2 h-8 w-20 animate-pulse rounded bg-gray-300 p-4"></div>
        <div className="mb-6 h-6 w-32 animate-pulse rounded bg-gray-300"></div>
        <div className="mb-6 h-12 w-full animate-pulse rounded bg-gray-300"></div>
        <div className="mb-6 h-12 w-full animate-pulse rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
}
