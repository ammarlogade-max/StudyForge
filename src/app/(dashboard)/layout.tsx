"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/notes", label: "Notes", icon: Brain },
  { href: "/dashboard/pdf-chat", label: "PDF Chat", icon: FileText },
  { href: "/dashboard/quiz", label: "Quiz", icon: HelpCircle },
  { href: "/dashboard/assignments", label: "Assignments", icon: CalendarCheck, badge: "2" },
  { href: "/dashboard/attendance", label: "Attendance", icon: ClipboardList },
  { href: "/dashboard/viva", label: "Viva Assistant", icon: Mic },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "SF";

  const displayName = user
    ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
    : "Student";

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-100 flex flex-col shrink-0">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-slate-900 tracking-tight">StudyForge</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
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
                      active
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-600"
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
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            Settings
          </Link>

          {/* User dropdown */}
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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center px-6 gap-4 shrink-0">
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
              className="relative text-slate-500 hover:text-slate-900"
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

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}