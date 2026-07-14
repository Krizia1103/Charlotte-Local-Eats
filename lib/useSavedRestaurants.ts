"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "clt-dining-guide:saved";

/**
 * Persists a set of saved restaurant ids to localStorage.
 * SSR-safe: it only reads localStorage after mount to avoid hydration
 * mismatches, and reflects updates made in other tabs.
 */
export function useSavedRestaurants() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSavedIds(JSON.parse(raw));
    } catch {
      // ignore corrupt/unavailable storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      // ignore storage write failures (e.g. private mode)
    }
  }, [savedIds, hydrated]);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setSavedIds(JSON.parse(e.newValue));
        } catch {
          // ignore
        }
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds]
  );

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const clearSaved = useCallback(() => setSavedIds([]), []);

  return { savedIds, isSaved, toggleSaved, clearSaved, hydrated };
}
