import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Brain,
  FileText,
  HelpCircle,
  CalendarCheck,
  ClipboardList,
  Mic,
  ArrowRight,
  TrendingUp,
  Clock,
  Flame,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Notes Summarized", value: "12", icon: Brain, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Avg Attendance", value: "84%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Quizzes Done", value: "7", icon: HelpCircle, color: "text-violet-600", bg: "bg-violet-50" },
  { label: "Study Streak", value: "5d", icon: Flame, color: "text-amber-600", bg: "bg-amber-50" },
];

const quickActions = [
  { href: "/dashboard/notes", label: "Summarize Notes", icon: Brain, desc: "Paste or upload" },
  { href: "/dashboard/pdf-chat", label: "Chat with PDF", icon: FileText, desc: "Upload any PDF" },
  { href: "/dashboard/quiz", label: "Generate Quiz", icon: HelpCircle, desc: "Test yourself" },
  { href: "/dashboard/viva", label: "Viva Practice", icon: Mic, desc: "AI examiner" },
];

const upcoming = [
  { subject: "DBMS Assignment", due: "Tomorrow", type: "Assignment", urgent: true },
  { subject: "OS Lab File", due: "3 days", type: "Submission", urgent: false },
  { subject: "Networks IA", due: "5 days", type: "Exam", urgent: false },
];

const attendance = [
  { subject: "Operating Systems", pct: 88, sessions: 22 },
  { subject: "DBMS", pct: 76, sessions: 25 },
  { subject: "Computer Networks", pct: 92, sessions: 24 },
  { subject: "DSA", pct: 68, sessions: 19 },
];

export default function DashboardPage() {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-1">{greeting} 👋</p>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Ammar's Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {now.toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>
        <Badge className="bg-slate-100 text-slate-600 border-0 text-xs px-3 py-1.5">
          Sem 5 · AI&ML
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-slate-100">
            <CardContent className="p-4">
              <div className={`w-8 h-8 rounded-lg ${s.bg} ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-4 h-4" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((a) => (
              <Link key={a.href} href={a.href}>
                <Card className="border-slate-100 hover:border-slate-300 hover:shadow-sm transition-all duration-150 cursor-pointer group h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 group-hover:bg-slate-700 transition-colors">
                      <a.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{a.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{a.desc}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Attendance */}
          <Card className="border-slate-100">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold text-slate-700">
                Attendance Overview
              </CardTitle>
              <Link href="/dashboard/attendance">
                <Button variant="ghost" size="sm" className="text-xs text-slate-400 h-7 px-2">
                  View all
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {attendance.map((a) => (
                <div key={a.subject}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-700">{a.subject}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{a.sessions} classes</span>
                      <span
                        className={`text-sm font-semibold ${
                          a.pct >= 85
                            ? "text-emerald-600"
                            : a.pct >= 75
                            ? "text-amber-600"
                            : "text-rose-600"
                        }`}
                      >
                        {a.pct}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        a.pct >= 85
                          ? "bg-emerald-500"
                          : a.pct >= 75
                          ? "bg-amber-400"
                          : "bg-rose-400"
                      }`}
                      style={{ width: `${a.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Upcoming
          </h2>
          <Card className="border-slate-100">
            <CardContent className="p-0">
              {upcoming.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-4 ${
                    i < upcoming.length - 1 ? "border-b border-slate-100" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      item.urgent ? "bg-rose-50" : "bg-slate-50"
                    }`}
                  >
                    <Clock
                      className={`w-4 h-4 ${
                        item.urgent ? "text-rose-500" : "text-slate-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 leading-tight">
                      {item.subject}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        className={`text-xs border-0 px-1.5 py-0.5 ${
                          item.urgent
                            ? "bg-rose-50 text-rose-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {item.type}
                      </Badge>
                      <span className="text-xs text-slate-400">{item.due}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-3 border-t border-slate-100">
                <Link href="/dashboard/assignments">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs text-slate-500 h-8 gap-1"
                  >
                    View all assignments
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent activity */}
          <Card className="border-slate-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-slate-700">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { text: "OS notes summarized", time: "2h ago", icon: Brain },
                { text: "Networks PDF chatted", time: "Yesterday", icon: FileText },
                { text: "DSA Quiz — 18/20", time: "Yesterday", icon: HelpCircle },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
                    <r.icon className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-700">{r.text}</p>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">{r.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}