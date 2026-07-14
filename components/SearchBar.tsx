"use client";

import { type FormEvent } from "react";
import { CloseIcon, SearchIcon } from "@/components/icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search by name, cuisine, or vibe",
  autoFocus,
}: SearchBarProps) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit?.(value);
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="relative">
      <span
        aria-hidden
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate"
      >
        <SearchIcon />
      </span>
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search restaurants"
        className="h-12 w-full rounded-full border border-lightgray bg-white pl-12 pr-11 text-sm text-charcoal shadow-sm outline-none transition placeholder:text-slate/70 focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-slate transition hover:bg-offwhite hover:text-charcoal"
        >
          <CloseIcon width={16} height={16} />
        </button>
      ) : null}
    </form>
  );
}
