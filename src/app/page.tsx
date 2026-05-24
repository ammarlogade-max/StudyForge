import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  FileText,
  HelpCircle,
  CalendarCheck,
  ClipboardList,
  Mic,
  LayoutDashboard,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Notes Summarizer",
    description: "Paste or upload your notes. Get crisp summaries instantly.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: FileText,
    title: "PDF Chat",
    description: "Upload any PDF and have a real conversation with it.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: HelpCircle,
    title: "Quiz Generator",
    description: "Auto-generate MCQs from your notes to test yourself.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: CalendarCheck,
    title: "Assignment Planner",
    description: "Track deadlines, set priorities, never miss a submission.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: ClipboardList,
    title: "Attendance Tracker",
    description: "Track subject-wise attendance with smart analytics.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Mic,
    title: "AI Viva Assistant",
    description: "Practice viva questions with your AI examiner.",
    color: "bg-sky-50 text-sky-600",
  },
];

const benefits = [
  "No more scattered notes across apps",
  "AI that understands your syllabus",
  "Built for Indian engineering students",
  "All tools in one clean dashboard",
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-900 text-lg tracking-tight">
              StudyForge
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <Link href="#features" className="hover:text-slate-900 transition-colors">
              Features
            </Link>
            <Link href="#why" className="hover:text-slate-900 transition-colors">
              Why StudyForge
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm" className="text-slate-600">
                Sign in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="bg-slate-900 hover:bg-slate-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <Badge
          variant="secondary"
          className="mb-6 text-xs tracking-wide bg-slate-100 text-slate-600 border-0 px-4 py-1.5"
        >
          ✦ Built for engineering students
        </Badge>

        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
          Your AI-powered
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">Student OS</span>
            <span
              className="absolute bottom-1 left-0 w-full h-3 bg-amber-200 -z-10 rounded"
              aria-hidden="true"
            />
          </span>
        </h1>

        <p className="text-lg text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Summarize notes, chat with PDFs, generate quizzes, track attendance —
          all in one focused workspace designed for serious students.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/sign-up">
            <Button
              size="lg"
              className="bg-slate-900 hover:bg-slate-700 text-white px-8 gap-2 group"
            >
              Start for free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline" className="px-8 border-slate-200 text-slate-700">
              Sign in
            </Button>
          </Link>
        </div>

        {/* Hero visual */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10 pointer-events-none" />
          <div className="border border-slate-200 rounded-2xl bg-slate-50 p-6 shadow-sm max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-300" />
              <div className="w-3 h-3 rounded-full bg-amber-300" />
              <div className="w-3 h-3 rounded-full bg-emerald-300" />
              <span className="text-xs text-slate-400 ml-2 font-mono">studyforge.vercel.app/dashboard</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Notes", value: "12", sub: "summarized" },
                { label: "Attendance", value: "84%", sub: "avg across subjects" },
                { label: "Quizzes", value: "7", sub: "completed" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl p-4 border border-slate-100 text-left"
                >
                  <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 bg-white rounded-xl p-4 border border-slate-100 text-left">
              <div className="flex items-center gap-2 mb-2">
                <LayoutDashboard className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-500 font-medium">AI Summarizer</span>
                <Badge className="ml-auto text-xs bg-emerald-50 text-emerald-600 border-0">
                  Done
                </Badge>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                <span className="font-medium text-slate-900">Summary:</span> Operating Systems
                scheduling uses FCFS, SJF, and Round Robin algorithms. Context switching involves
                saving PCB state. Deadlock prevention requires all four Coffman conditions...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <Badge
            variant="secondary"
            className="mb-4 text-xs bg-slate-100 text-slate-500 border-0"
          >
            Features
          </Badge>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Everything you need. Nothing you don't.
          </h2>
          <p className="text-slate-500 mt-3 max-w-md mx-auto">
            Six focused tools built specifically for how engineering students actually study.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <Card
              key={f.title}
              className="border-slate-100 hover:border-slate-300 hover:shadow-sm transition-all duration-200 group"
            >
              <CardContent className="p-6">
                <div className={`w-10 h-10 rounded-lg ${f.color} flex items-center justify-center mb-4`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why section */}
      <section
        id="why"
        className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-100"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge
              variant="secondary"
              className="mb-4 text-xs bg-slate-100 text-slate-500 border-0"
            >
              Why StudyForge
            </Badge>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
              Stop juggling 10 apps.
              <br />
              Start actually studying.
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              Most students use Notion for notes, Google Calendar for deadlines,
              random apps for attendance — and still miss their viva prep. StudyForge
              brings it all together with AI baked in from day one.
            </p>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <div className="space-y-3">
              {[
                { day: "Mon", task: "OS Notes → Summarized by AI", done: true },
                { day: "Mon", task: "DBMS Assignment due in 2 days", done: false },
                { day: "Tue", task: "Networks PDF → Chatted & revised", done: true },
                { day: "Wed", task: "DSA Quiz → 18/20 score", done: true },
                { day: "Thu", task: "Viva Practice → 12 questions done", done: true },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-sm ${
                    item.done
                      ? "bg-white border-slate-100 text-slate-700"
                      : "bg-amber-50 border-amber-100 text-amber-800"
                  }`}
                >
                  <span className="text-xs text-slate-400 w-8 shrink-0">{item.day}</span>
                  <span className="flex-1">{item.task}</span>
                  {item.done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">Due soon</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-slate-900 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
            Ready to study smarter?
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Join students already using StudyForge to ace their semesters.
          </p>
          <Link href="/sign-up">
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 px-10 gap-2 group"
            >
              Get started free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-slate-900 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700">StudyForge</span>
          </div>
          <p className="text-xs text-slate-400">
            Built by Ammar · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  );
}