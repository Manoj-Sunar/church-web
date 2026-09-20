import ClientWrapper from "../ClientWrapper";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientWrapper>{children}</ClientWrapper>;
}