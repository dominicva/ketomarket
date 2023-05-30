export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="p-4">{children}</section>;
}
