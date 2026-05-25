"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Brain,
  FileText,
  HelpCircle,
  CalendarCheck,
  ClipboardList,
  Mic,
  Settings,
  Sparkles,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSyncUser } from "@/hooks/useSyncUser";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/notes", label: "Notes", icon: Brain },
  { href: "/dashboard/pdf-chat", label: "PDF Chat", icon: FileText },
  { href: "/dashboard/quiz", label: "Quiz", icon: HelpCircle },
  { href: "/dashboard/assignments", label: "Assignments", icon: CalendarCheck, badge: "2" },
  { href: "/dashboard/attendance", label: "Attendance", icon: ClipboardList },
  { href: "/dashboard/viva", label: "Viva Assistant", icon: Mic },
];

// Bottom nav shows only 5 most important items on mobile
const bottomNavItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/dashboard/notes", label: "Notes", icon: Brain },
  { href: "/dashboard/quiz", label: "Quiz", icon: HelpCircle },
  { href: "/dashboard/assignments", label: "Tasks", icon: CalendarCheck },
  { href: "/dashboard/attendance", label: "Attend", icon: ClipboardList },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useSyncUser();

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "SF";

  const displayName = user
    ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
    : "Student";

  const handleSignOut = async () => {
    await signOut({ redirectUrl: "/" });
  };

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile, slide-in on toggle */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 flex flex-col transition-transform duration-200 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-slate-900 tracking-tight">StudyForge</span>
          </div>
          <button
            className="lg:hidden p-1 rounded-lg hover:bg-slate-100"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon
                  className={cn(
                    "w-4 h-4 shrink-0",
                    active ? "text-white" : "text-slate-400 group-hover:text-slate-600"
                  )}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge
                    className={cn(
                      "text-xs h-5 px-1.5 border-0",
                      active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-slate-100 space-y-0.5">
          <Link
            href="/dashboard/settings"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            Settings
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-all cursor-pointer">
                <Avatar className="w-7 h-7">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback className="bg-amber-100 text-amber-700 text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-slate-900 truncate">{displayName}</p>
                  <p className="text-xs text-slate-400 truncate">
                    {user?.primaryEmailAddress?.emailAddress ?? "student"}
                  </p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-rose-600 focus:text-rose-600 cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="h-14 lg:h-16 bg-white border-b border-slate-100 flex items-center px-4 lg:px-6 gap-3 shrink-0">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo on mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-slate-900 text-sm">StudyForge</span>
          </div>

          <div className="flex-1 flex items-center gap-3">
            <div className="relative max-w-xs w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search notes, assignments..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-slate-500 hover:text-slate-900 h-9 w-9"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
            </Button>
            <Avatar className="w-8 h-8 cursor-pointer">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback className="bg-amber-100 text-amber-700 text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page content — extra bottom padding on mobile for bottom nav */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-24 lg:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white border-t border-slate-100">
        <div className="flex items-center justify-around px-2 py-2">
          {bottomNavItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all min-w-0"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                    active ? "bg-slate-900" : "bg-transparent"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5",
                      active ? "text-white" : "text-slate-400"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-xs font-medium truncate",
                    active ? "text-slate-900" : "text-slate-400"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
        {/* Safe area spacing for phones with home indicator */}
        <div className="h-safe-bottom" />
      </nav>
    </div>
  );
}