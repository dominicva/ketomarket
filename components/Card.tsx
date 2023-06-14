export default function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-lg p-6 shadow-md ${className}`}
      // style={{ minWidth: '300px' }}
    >
      {children}
    </div>
  );
}
