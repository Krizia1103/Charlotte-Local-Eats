"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookmarkIcon,
  CompassIcon,
  HomeIcon,
  MapIcon,
} from "@/components/icons";
import { useSaved } from "@/lib/saved-context";

const ITEMS = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/explore", label: "Explore", Icon: CompassIcon },
  { href: "/map", label: "Map", Icon: MapIcon },
  { href: "/saved", label: "Saved", Icon: BookmarkIcon },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { savedIds, hydrated } = useSaved();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-lightgray bg-white/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
    >
      <ul className="mx-auto flex max-w-3xl items-stretch justify-around px-2">
        {ITEMS.map(({ href, label, Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          const showBadge = href === "/saved" && hydrated && savedIds.length > 0;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative flex min-h-[52px] flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition ${
                  active ? "text-accent" : "text-slate hover:text-charcoal"
                }`}
              >
                <span className="relative">
                  <Icon
                    className={active ? "stroke-[2.1]" : ""}
                    width={22}
                    height={22}
                  />
                  {showBadge ? (
                    <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold leading-none text-white">
                      {savedIds.length}
                    </span>
                  ) : null}
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
