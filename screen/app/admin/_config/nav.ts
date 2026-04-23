// app/admin/_config/nav.ts
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Users,
  FileText,
  Globe,
  MessageCircle
} from "lucide-react";

export type AdminNavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export const ADMIN_NAV: AdminNavItem[] = [
  { name: "Dashboard", href: "/admin/admin-pages/dashboard", icon: LayoutDashboard },
  { name: "Sermons", href: "/admin/admin-pages/admin-sermon", icon: BookOpen },
  { name: "Events", href: "/admin/admin-pages/admin-event", icon: Calendar },
  { name: "Ministries", href: "/admin/admin-pages/admin-ministries", icon: Users },
  { name: "Leaders", href: "/admin/admin-pages/admin-leader", icon: Users },
  { name: "Members", href: "/admin/admin-pages/admin-members", icon: Users },
  { name: "Messages", href: "/admin/admin-pages/admin-messages", icon: MessageCircle },
  { name: "Page Content", href: "/admin/admin-pages/admin-content", icon: FileText },
];