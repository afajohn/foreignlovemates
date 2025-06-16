export default async function PALayout({ 
  children,
}: { 
  children: React.ReactNode;
  searchParams?: { page?: number; edit?: number };
}) {
  return <>{children}</>;
}