"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";

export default function HomeSearch() {
  const [value, setValue] = useState("");
  const router = useRouter();

  function go(q: string) {
    const trimmed = q.trim();
    router.push(trimmed ? `/explore?q=${encodeURIComponent(trimmed)}` : "/explore");
  }

  return (
    <SearchBar
      value={value}
      onChange={setValue}
      onSubmit={go}
      placeholder="Search restaurants, cuisine, or vibe"
    />
  );
}
