// app/admin/login/page.tsx

import type { Metadata } from "next";
import AdminLoginClient from "../admin/_components/AdminLogin/AdminLoginClient";


export const metadata: Metadata = {
    title: "Admin Login | Church Admin",
    description: "Sign in to the admin dashboard to manage church website content securely.",
    robots: { index: false, follow: false }, // important for admin pages
};

export default function AdminLoginPage() {
    return <AdminLoginClient />;
}