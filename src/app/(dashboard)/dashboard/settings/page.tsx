"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/nextjs";
import { Mail, GraduationCap, User } from "lucide-react";

export default function SettingsPage() {
  const { user } = useUser();

  const displayName = user
    ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
    : "Student";

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "SF";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <Card className="border-slate-100">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-slate-900">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback className="bg-amber-100 text-amber-700 text-lg font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-slate-900 text-lg">{displayName}</p>
              <p className="text-slate-500 text-sm">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
              <Badge className="mt-1 bg-slate-100 text-slate-600 border-0 text-xs">
                Engineering Student
              </Badge>
            </div>
          </div>

          <div className="grid gap-3 pt-2">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <User className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400">Full Name</p>
                <p className="text-sm font-medium text-slate-900">{displayName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <Mail className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400">Email</p>
                <p className="text-sm font-medium text-slate-900">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <GraduationCap className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400">Branch</p>
                <p className="text-sm font-medium text-slate-900">Computer Science · AI & ML</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 pt-1">
            To update your name or email, visit{" "}
            <a
              href="https://accounts.clerk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 underline"
            >
              Clerk account settings
            </a>
          </p>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card className="border-slate-100">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-slate-900">App Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Version", value: "1.0.0 · Week 1 Build" },
            { label: "Stack", value: "Next.js · Supabase · Groq AI" },
            { label: "Built by", value: "Ammar Logade" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <span className="text-sm text-slate-500">{item.label}</span>
              <span className="text-sm font-medium text-slate-900">{item.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}