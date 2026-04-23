import type { Metadata } from "next";

import "./globals.css";


import ClientWrapper from "./ClientWrapper";




export const metadata: Metadata = {
  title: "Church Site",
  description: "This is the church website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
       <ClientWrapper>
        {children}
       </ClientWrapper>
      </body>
    </html>
  );
}
