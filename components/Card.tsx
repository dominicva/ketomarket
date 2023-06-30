export default function Card({
  as: Component = 'div',
  className,
  children,
}: {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Component className={`rounded-lg p-6 shadow-md ${className}`}>
      {children}
    </Component>
  );
}
