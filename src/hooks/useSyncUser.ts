"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export function useSyncUser() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const sync = async () => {
      try {
        await fetch("/api/sync-user", { method: "POST" });
      } catch (err) {
        console.error("Failed to sync user:", err);
      }
    };

    sync();
  }, [user, isLoaded]);
}