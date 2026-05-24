import { SignUp } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-slate-900 text-lg tracking-tight">
          StudyForge
        </span>
      </Link>

      {/* Clerk SignUp component */}
      <SignUp
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "shadow-sm border border-slate-200 rounded-2xl",
            headerTitle: "text-slate-900 font-bold tracking-tight",
            headerSubtitle: "text-slate-500",
            socialButtonsBlockButton:
              "border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg",
            formFieldLabel: "text-slate-700 text-sm font-medium",
            formFieldInput:
              "border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-slate-900/10",
            formButtonPrimary:
              "bg-slate-900 hover:bg-slate-700 text-white font-medium rounded-lg",
            footerActionLink: "text-slate-900 font-medium hover:underline",
          },
        }}
      />

      <p className="mt-6 text-xs text-slate-400 text-center">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-slate-700 font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}