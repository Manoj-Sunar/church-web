import { cookies } from 'next/headers';
import { Providers } from '../Provider';
import AdminSidebar from './_components/AdminSidebar';
import type { User } from '@/app/Types/APIResponse';

const API_BASE = process.env.API_URL ?? 'http://localhost:5000';

async function getServerUser(): Promise<User | null> {
  // ✅ await the promise
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  if (!cookieHeader) return null;

  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { cookie: cookieHeader },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user ?? null;
  } catch {
    return null;
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialUser = await getServerUser();

  return (
    <Providers initialUser={initialUser}>
      <div className="min-h-screen bg-slate-50 lg:flex">
        <AdminSidebar />
        <main className="min-w-0 flex-1 p-4 sm:p-5 md:p-6 lg:p-8 overflow-x-hidden">
          <Providers>{children}</Providers>
        </main>
      </div>
    </Providers>
  );
}