export default function ProductPageSkeleton() {
  return (
    <div className="mt-10 flex w-full flex-col items-center px-2">
      <div className="m-auto flex w-full max-w-2xl flex-col flex-wrap gap-8 px-8 sm:flex-row sm:pb-4 lg:mx-0">
        <div className="h-52 animate-pulse rounded-md rounded-b-none bg-gray-300 sm:h-60 sm:basis-[57%]"></div>
        <div className="sm:basis-[37%]">
          <div className="mb-1 h-7 w-20 animate-pulse bg-gray-300 sm:mb-2"></div>
          <div className="mb-1 h-4 w-8 animate-pulse bg-gray-300 sm:mb-2"></div>
          <div className="h-40 w-full animate-pulse bg-gray-300 sm:h-44"></div>
        </div>
        <div className="max-w-md sm:m-auto sm:w-1/2">
          <div className="mb-1 h-7 w-16 animate-pulse bg-gray-300"></div>
          <div className="mb-4 h-6 w-28 animate-pulse bg-gray-300"></div>
          <div className="mb-6 h-12 w-full animate-pulse bg-gray-300"></div>
          <div className="h-12 w-full animate-pulse rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
