// app/admin/sermons/page.tsx
import type { Metadata } from "next";
import AdminSermonsPage from "../../_components/AdminSermon/AdminSermonPage";


export const metadata: Metadata = {
    title: "Manage Sermons | Admin",
    description: "Create, edit, and manage your church sermon archive.",
    robots: { index: false, follow: false }, // admin page => no index
};

export default function Page() {
    return <AdminSermonsPage />;
}