export default function HomeSkeleton() {
  return (
    <div className="m-auto mt-2 flex max-w-5xl animate-pulse flex-col gap-4 bg-gray-100 p-4">
      <div className="mb-6 flex flex-col gap-2">
        <div className="mb-4 h-12 w-1/2 rounded bg-gray-300"></div>
        <div className="mb-2 h-4 w-1/2 rounded bg-gray-300"></div>
        {/* <div className="h-4 w-1/3 rounded bg-gray-300"></div> */}
        <div className="mb-4 h-12 w-1/4 rounded-full bg-gray-300"></div>
        <div className="h-4 w-1/3 rounded bg-gray-300"></div>
      </div>
    </div>
  );
}
