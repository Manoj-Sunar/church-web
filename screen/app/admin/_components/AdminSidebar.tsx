"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, Sun, X } from "lucide-react";

import { ADMIN_NAV } from "../_config/nav";
import { cn } from "@/app/utils/cn";
import { useMutation } from "@tanstack/react-query";
import { adminAPI } from "@/app/API/admin.api";

type SidebarContentProps = {
  pathname: string | null;
  isLoggingOut: boolean;
  onLogout: () => void;
  onNavigate?: () => void;
};

function SidebarContent({
  pathname,
  isLoggingOut,
  onLogout,
  onNavigate,
}: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-2 border-b-4 border-primary-soft p-4 md:p-6">
        <div className="rounded-xl bg-primary p-1.5">
          <Sun className="h-5 w-5 text-white" />
        </div>
        <span className="font-display text-base font-bold text-slate-800 md:text-lg">
          Admin Panel
        </span>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-3 md:p-4">
        {ADMIN_NAV.map((item) => {
          const active =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-2xl p-3 font-display font-bold transition-all",
                active
                  ? "bg-primary text-white disney-shadow"
                  : "text-slate-500 hover:bg-primary-soft hover:text-primary"
              )}
              prefetch
            >
              <Icon size={20} />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t-4 border-primary-soft p-3 md:p-4">
        <button
          type="button"
          onClick={onLogout}
          disabled={isLoggingOut}
          className={cn(
            "flex w-full items-center gap-3 rounded-2xl p-3 font-display font-bold transition-all",
            "text-slate-500 hover:bg-accent-soft hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
          )}
        >
          <LogOut size={20} />
          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar() {


  const pathname = usePathname();
  const router = useRouter();

  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  // ✅ SINGLE SOURCE OF TRUTH (React Query)
  const logoutMutation = useMutation({
    mutationFn: adminAPI.Logout,
    onSuccess: () => {
      setIsMobileOpen(false);
      router.replace("/admin-login");
      router.refresh();
    },
  });

  const handleLogout = () => {
    if (logoutMutation.isPending) return;
    logoutMutation.mutate();
  };

  const closeMobileMenu = () => setIsMobileOpen(false);

  React.useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);



  
  React.useEffect(() => {
    if (!isMobileOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile / Tablet top bar */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b-4 border-primary-soft bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-primary p-1.5">
            <Sun className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-base font-bold text-slate-800">
            Admin Panel
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="rounded-xl p-2"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 border-r-4 border-primary-soft bg-white lg:flex lg:flex-col xl:w-72">
        <SidebarContent
          pathname={pathname}
          isLoggingOut={logoutMutation.isPending}
          onLogout={handleLogout}
        />
      </aside>

      {/* Mobile sidebar overlay */}
      <div className={cn("fixed inset-0 z-50 lg:hidden", isMobileOpen ? "" : "pointer-events-none")}>
        <div
          className={cn(
            "absolute inset-0 bg-slate-900/40 transition-opacity",
            isMobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={closeMobileMenu}
        />

        <aside
          className={cn(
            "absolute left-0 top-0 h-full w-[85vw] max-w-xs bg-white transition-transform",
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-16 items-center justify-between border-b-4 border-primary-soft px-4">
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-white bg-primary rounded-xl p-1.5" />
              <span className="font-display text-base font-bold text-slate-800">
                Admin Panel
              </span>
            </div>

            <button onClick={closeMobileMenu}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <SidebarContent
            pathname={pathname}
            isLoggingOut={logoutMutation.isPending}
            onLogout={handleLogout}
            onNavigate={closeMobileMenu}
          />
        </aside>
      </div>
    </>
  );
}