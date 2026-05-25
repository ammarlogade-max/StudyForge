"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AttendancePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Attendance</h1>
          <p className="text-slate-500 text-sm mt-0.5">Track subject-wise attendance with analytics</p>
        </div>
        <Badge className="bg-amber-50 text-amber-600 border-0">Coming Day 12</Badge>
      </div>

      <Card className="border-slate-200 border-dashed">
        <CardContent className="py-16 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center">
            <ClipboardList className="w-8 h-8 text-rose-500" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">Attendance Tracker coming soon</h3>
            <p className="text-sm text-slate-500 max-w-sm">
              Add your subjects, mark attendance daily, and get real-time analytics
              showing if you're at risk of falling below 75%.
            </p>
          </div>
          <Button disabled className="gap-2 bg-slate-900 text-white opacity-50 cursor-not-allowed">
            <Sparkles className="w-4 h-4" />
            Add Subject
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}