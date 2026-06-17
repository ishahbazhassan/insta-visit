import ProviderShell from "@/features/provider/components/ProviderShell";

export default function ProviderRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProviderShell>{children}</ProviderShell>;
}
