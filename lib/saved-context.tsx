"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useSavedRestaurants } from "@/lib/useSavedRestaurants";

type SavedContextValue = ReturnType<typeof useSavedRestaurants>;

const SavedContext = createContext<SavedContextValue | null>(null);

export function SavedProvider({ children }: { children: ReactNode }) {
  const value = useSavedRestaurants();
  return (
    <SavedContext.Provider value={value}>{children}</SavedContext.Provider>
  );
}

export function useSaved(): SavedContextValue {
  const ctx = useContext(SavedContext);
  if (!ctx) {
    throw new Error("useSaved must be used within a SavedProvider");
  }
  return ctx;
}
