// app/admin/events/page.tsx
import type { Metadata } from "next";
import AdminEventsPage from "../../_components/AdminEvent/AdminEventPage";


export const metadata: Metadata = {
  title: "Manage Events | Admin",
  description: "Create, edit, and manage upcoming church events.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminEventsPage/>;
}