import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const email = user.emailAddresses[0]?.emailAddress ?? "";
    const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
    const avatar_url = user.imageUrl;

    // Check if user already exists
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", userId)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("users")
        .update({ name, avatar_url, updated_at: new Date().toISOString() })
        .eq("clerk_id", userId);

      return NextResponse.json({ message: "User updated", id: existing.id });
    }

    const { data, error } = await supabase
      .from("users")
      .insert({ clerk_id: userId, email, name, avatar_url })
      .select("id")
      .maybeSingle();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "User created", id: data?.id });
  } catch (err) {
    console.error("Sync error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}