"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PDFChatPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">PDF Chat</h1>
          <p className="text-slate-500 text-sm mt-0.5">Upload a PDF and chat with it using AI</p>
        </div>
        <Badge className="bg-amber-50 text-amber-600 border-0">Coming Day 8</Badge>
      </div>

      <Card className="border-slate-200 border-dashed">
        <CardContent className="py-16 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center">
            <FileText className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">PDF Chat is coming soon</h3>
            <p className="text-sm text-slate-500 max-w-sm">
              Upload any PDF — textbooks, question papers, lab manuals — and have a full
              conversation with it powered by AI.
            </p>
          </div>
          <Button disabled className="gap-2 bg-slate-900 text-white opacity-50 cursor-not-allowed">
            <Upload className="w-4 h-4" />
            Upload PDF
          </Button>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5" />
            Powered by Groq · Free
          </div>
        </CardContent>
      </Card>
    </div>
  );
}