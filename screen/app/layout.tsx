import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Church Site",
  description: "This is the church website",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}