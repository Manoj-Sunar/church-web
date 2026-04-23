// app/admin/leaders/page.tsx
import type { Metadata } from "next";
import AdminLeadersPage from "../../_components/AdminLeader/AdminLeader";


export const metadata: Metadata = {
  title: "Manage Leaders | Admin",
  description: "Add, edit, and manage church leadership team members.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminLeadersPage />;
}