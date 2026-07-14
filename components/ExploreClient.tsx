"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { Category, Filters } from "@/types/restaurant";
import { restaurants } from "@/data/restaurants";
import { getCategoryGroups, useFilters } from "@/lib/useFilters";
import { BASE_LOCATION, CATEGORIES, SORT_OPTIONS } from "@/lib/constants";
import SearchBar from "@/components/SearchBar";
import RestaurantCard from "@/components/RestaurantCard";
import FilterDrawer from "@/components/FilterDrawer";
import EmptyState from "@/components/EmptyState";
import { CardSkeletonGrid } from "@/components/CardSkeleton";
import { CompassIcon, SlidersIcon } from "@/components/icons";

const CATEGORY_VALUES = CATEGORIES.map((category) => category.value);

export default function ExploreClient() {
  const searchParams = useSearchParams();

  const initialFilters = useMemo<Partial<Filters>>(() => {
    const q = searchParams.get("q") ?? "";
    const category = searchParams.get("category");
    return {
      search: q,
      categories:
        category && CATEGORY_VALUES.includes(category as Category)
          ? [category as Category]
          : [],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    filters,
    results,
    toggleArrayValue,
    setField,
    reset,
    activeCount,
  } = useFilters(restaurants, initialFilters);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const selectedCategory =
    filters.categories.length === 1 ? filters.categories[0] : undefined;
  const groups = getCategoryGroups(results, selectedCategory);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      <div className="mb-2">
        <div className="mb-2 flex items-center gap-2.5">
          <span aria-hidden className="rule-accent" />
          <p className="eyebrow text-accent">Directory</p>
        </div>
        <h1 className="font-display text-[26px] font-semibold tracking-tight text-navy">
          Explore venues
        </h1>
        <p className="mt-1 text-sm text-slate">
          {restaurants.length} curated spots based from {BASE_LOCATION}.
        </p>
      </div>

      <div className="sticky top-16 z-30 -mx-4 bg-offwhite/90 px-4 pb-2 pt-3 backdrop-blur">
        <SearchBar
          value={filters.search}
          onChange={(v) => setField("search", v)}
          placeholder="Search restaurants, cuisine, or notes"
        />

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="relative inline-flex shrink-0 items-center gap-1.5 rounded-full border border-lightgray bg-white px-3.5 py-2 text-sm font-medium text-charcoal shadow-sm transition hover:border-accent hover:text-accent"
          >
            <SlidersIcon width={16} height={16} />
            Filters
            {activeCount > 0 ? (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-semibold text-white">
                {activeCount}
              </span>
            ) : null}
          </button>

          <div className="relative shrink-0">
            <label htmlFor="sort" className="sr-only">
              Sort by
            </label>
            <select
              id="sort"
              value={filters.sort}
              onChange={(e) =>
                setField("sort", e.target.value as Filters["sort"])
              }
              className="h-9 appearance-none rounded-full border border-lightgray bg-white pl-3.5 pr-8 text-sm font-medium text-charcoal shadow-sm outline-none transition hover:border-accent focus:border-accent"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate">
              &#9662;
            </span>
          </div>
        </div>

        <div className="mt-3 -mr-4 flex gap-2 overflow-x-auto pr-4 no-scrollbar">
          {CATEGORIES.map((category) => {
            const active = filters.categories.includes(category.value);
            return (
              <button
                key={category.value}
                type="button"
                onClick={() => toggleArrayValue("categories", category.value)}
                aria-pressed={active}
                className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-lightgray bg-white text-charcoal hover:border-accent hover:text-accent"
                }`}
              >
                {category.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        {loading ? (
          <CardSkeletonGrid count={6} />
        ) : results.length === 0 ? (
          <EmptyState
            icon={<CompassIcon width={26} height={26} />}
            title="No matches found"
            description="Try removing a filter or searching for a different restaurant, cuisine, or note."
            action={
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-deep"
              >
                Reset filters
              </button>
            }
          />
        ) : (
          <>
            <p className="mb-3 text-sm text-slate">
              {results.length} {results.length === 1 ? "result" : "results"}
            </p>
            <div className="space-y-8">
              {groups.map((group) => (
                <section key={group.title}>
                  <div className="mb-3">
                    <h2 className="font-display text-xl font-semibold text-navy">
                      {group.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate">
                      {group.description}
                    </p>
                  </div>
                  <motion.div
                    layout
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                  >
                    <AnimatePresence mode="popLayout">
                      {group.restaurants.map((r) => (
                        <RestaurantCard key={r.id} restaurant={r} />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </section>
              ))}
            </div>
          </>
        )}
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        resultCount={results.length}
        activeCount={activeCount}
        toggleArrayValue={toggleArrayValue}
        reset={reset}
      />
    </div>
  );
}
