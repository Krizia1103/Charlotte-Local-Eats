"use client";

import Link from "next/link";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";

const MENU_LINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore restaurants" },
  { href: "/map", label: "Map & distance" },
  { href: "/saved", label: "Saved places" },
];

export default function AppHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-offwhite/85 backdrop-blur-md">
      <div aria-hidden className="h-[3px] w-full bg-gradient-to-r from-navy via-accent to-accent-bright" />
      <div className="mx-auto flex h-[60px] max-w-3xl items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2.5 leading-tight">
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-md bg-navy text-[13px] font-semibold text-white"
          >
            CLT
          </span>
          <span className="flex flex-col">
            <span className="font-display text-[17px] font-semibold text-navy">
              Dining Guide
            </span>
            <span className="text-[10.5px] font-medium uppercase tracking-[0.13em] text-slate">
              Uptown Charlotte
            </span>
          </span>
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-full border border-lightgray bg-white text-charcoal transition hover:border-accent hover:text-accent"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {open ? (
        <div
          className="border-t border-lightgray bg-white"
          role="dialog"
          aria-label="Navigation menu"
        >
          <nav className="mx-auto flex max-w-3xl flex-col px-4 py-2">
            {MENU_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium text-charcoal transition hover:bg-offwhite hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <p className="px-2 py-3 text-xs text-slate">
              Sample data shown. Verify details before sharing externally.
            </p>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
