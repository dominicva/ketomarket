export default function HomeSkeleton() {
  return (
    <div className="mt-2 flex animate-pulse flex-col gap-4 bg-gray-100 p-4">
      <div className="m-auto mb-6 flex w-full max-w-5xl flex-col gap-2  p-6">
        <div className="mb-4 h-12 w-1/2 rounded bg-gray-300"></div>
        <div className="mb-2 h-4 w-1/2 rounded bg-gray-300"></div>
        <div className="mb-4 h-12 w-1/4 rounded-full bg-gray-300"></div>
        <div className="h-4 w-1/3 rounded bg-gray-300"></div>
      </div>
    </div>
  );
}
