import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { groq } from "@/lib/groq";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { noteId, content } = body;

    if (!content || !noteId) {
      return NextResponse.json(
        { error: "noteId and content are required" },
        { status: 400 }
      );
    }

    // Call Groq API
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an expert academic summarizer for engineering students. 
Your job is to summarize study notes clearly and concisely.

Rules:
- Write a crisp summary in 4-6 sentences
- Highlight key concepts, definitions, and important points
- Use simple language an engineering student would understand
- Do NOT use bullet points — write in flowing paragraphs
- Focus on what's most important for exams`,
        },
        {
          role: "user",
          content: `Please summarize these notes:\n\n${content}`,
        },
      ],
      temperature: 0.4,
      max_tokens: 500,
    });

    const summary = completion.choices[0]?.message?.content ?? "";

    // Save summary back to Supabase
    const { error } = await supabase
      .from("notes")
      .update({ summary })
      .eq("id", noteId);

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ summary });
  } catch (err) {
    console.error("Summarize error:", err);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}