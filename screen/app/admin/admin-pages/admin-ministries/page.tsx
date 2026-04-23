// app/admin/ministries/page.tsx
import type { Metadata } from "next";
import AdminMinistriesPage from "../../_components/AdminMinistries/AdminMinistriesPage";



export const metadata: Metadata = {
  title: "Manage Ministries | Admin",
  description: "Create, edit, and manage church ministries and departments.",
  robots: { index: false, follow: false },
};

export default  function Page() {


  



  return <AdminMinistriesPage />;
}