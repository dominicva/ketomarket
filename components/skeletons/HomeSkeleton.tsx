export default function HomeSkeleton() {
  return (
    <div className="mt-2 flex animate-pulse flex-col gap-4 bg-gray-100 p-4">
      <div className="m-auto mb-6 flex w-full max-w-5xl flex-col gap-2  p-6">
        <div className="mb-4 h-12 w-1/2 rounded bg-gray-300"></div>
        <div className="mb-2 h-4 w-1/2 rounded bg-gray-300"></div>
        <div className="mb-4 h-12 w-1/4 rounded-full bg-gray-300"></div>
        <div className="h-4 w-1/3 rounded bg-gray-300"></div>
      </div>
      <div className="m-auto flex w-full max-w-5xl flex-col gap-6 p-4">
        <div className="m-auto h-32 w-3/4 max-w-2xl bg-gray-300 md:h-16 md:w-5/6"></div>

        {Array(10)
          .fill(0)
          .map((_, i) => {
            return (
              <div className="flex">
                <div className="mr-4 h-12 w-16 self-center rounded bg-gray-300"></div>
                <div className="flex flex-col justify-center">
                  <div className="mb-1 h-8 w-16 bg-gray-300"></div>
                  <div className="flex">
                    <div className="mr-2 h-6 w-24 bg-gray-300"></div>
                    <div className="h-6 w-8 bg-gray-300"></div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
