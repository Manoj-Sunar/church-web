// app/admin/members/page.tsx
import type { Metadata } from "next";
import AdminMembersPage from "../../_components/AdminMember/AdminMember";


export const metadata: Metadata = {
  title: "Manage Members | Admin",
  description: "View and manage church membership records.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminMembersPage/>;
}