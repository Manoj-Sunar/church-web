import { Providers } from "../Provider";
import AdminSidebar from "./_components/AdminSidebar";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="min-h-screen bg-slate-50 lg:flex">
        <AdminSidebar />
        <main className="min-w-0 flex-1 p-4 sm:p-5 md:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </Providers>
  );
}