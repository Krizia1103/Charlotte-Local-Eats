"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Filters } from "@/types/restaurant";
import { ATTRIBUTE_FILTERS, CATEGORIES } from "@/lib/constants";
import { CloseIcon } from "@/components/icons";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  resultCount: number;
  activeCount: number;
  toggleArrayValue: <K extends keyof Filters>(
    key: K,
    value: Filters[K] extends Array<infer T> ? T : never
  ) => void;
  reset: () => void;
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-2 text-sm font-medium transition active:scale-[0.97] ${
        active
          ? "border-accent bg-accent text-white"
          : "border-lightgray bg-white text-charcoal hover:border-accent hover:text-accent"
      }`}
    >
      {children}
    </button>
  );
}

function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-4">
      <h3 className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-slate">
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export default function FilterDrawer({
  open,
  onClose,
  filters,
  resultCount,
  activeCount,
  toggleArrayValue,
  reset,
}: FilterDrawerProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-navy-deep/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white shadow-float sm:rounded-3xl"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-lightgray bg-white px-5 py-4">
              <h2 className="font-display text-lg font-semibold text-navy">
                Filters
              </h2>
              <div className="flex items-center gap-2">
                {activeCount > 0 ? (
                  <button
                    type="button"
                    onClick={reset}
                    className="text-sm font-medium text-accent hover:underline"
                  >
                    Clear all
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close filters"
                  className="grid h-9 w-9 place-items-center rounded-full border border-lightgray text-slate transition hover:border-accent hover:text-accent"
                >
                  <CloseIcon width={18} height={18} />
                </button>
              </div>
            </div>

            <div className="divide-y divide-lightgray px-5">
              <Group label="Category">
                {CATEGORIES.map((category) => (
                  <Pill
                    key={category.value}
                    active={filters.categories.includes(category.value)}
                    onClick={() =>
                      toggleArrayValue("categories", category.value)
                    }
                  >
                    {category.label}
                  </Pill>
                ))}
              </Group>

              <Group label="Good to know">
                {ATTRIBUTE_FILTERS.map((attr) => (
                  <Pill
                    key={attr.value}
                    active={filters.attributes.includes(attr.value)}
                    onClick={() => toggleArrayValue("attributes", attr.value)}
                  >
                    {attr.label}
                  </Pill>
                ))}
              </Group>
            </div>

            <div className="sticky bottom-0 border-t border-lightgray bg-white px-5 py-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl bg-navy py-3 text-sm font-semibold text-white transition hover:bg-navy-deep"
              >
                Show {resultCount} {resultCount === 1 ? "place" : "places"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
