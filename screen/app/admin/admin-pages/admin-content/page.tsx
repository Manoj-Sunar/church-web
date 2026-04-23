// app/admin/content/page.tsx
import type { Metadata } from "next";
import AdminContentPage from "../../_components/AdminContent/AdminContent";


export const metadata: Metadata = {
  title: "Manage Content | Admin",
  description: "Edit page content and media across your website.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminContentPage />;
}