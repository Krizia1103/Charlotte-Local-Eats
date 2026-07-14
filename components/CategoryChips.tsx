"use client";

import Link from "next/link";
import { CATEGORY_CHIPS } from "@/lib/constants";

export default function CategoryChips() {
  return (
    <div className="-mx-4 overflow-x-auto px-4 no-scrollbar">
      <div className="flex w-max gap-2">
        {CATEGORY_CHIPS.map((chip) => (
          <Link
            key={chip.value}
            href={`/explore?category=${chip.value}`}
            className="whitespace-nowrap rounded-full border border-lightgray bg-white px-4 py-2 text-sm font-medium text-charcoal shadow-sm transition hover:border-accent hover:text-accent active:scale-[0.97]"
          >
            {chip.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
