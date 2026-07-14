"use client";

import Link from "next/link";
import { restaurants } from "@/data/restaurants";
import { useSaved } from "@/lib/saved-context";
import RestaurantCard from "@/components/RestaurantCard";
import EmptyState from "@/components/EmptyState";
import { CardSkeletonGrid } from "@/components/CardSkeleton";
import { BookmarkIcon } from "@/components/icons";

export default function SavedRestaurants() {
  const { savedIds, hydrated, clearSaved } = useSaved();

  if (!hydrated) {
    return <CardSkeletonGrid count={2} />;
  }

  const saved = restaurants.filter((r) => savedIds.includes(r.id));

  if (saved.length === 0) {
    return (
      <EmptyState
        icon={<BookmarkIcon width={26} height={26} />}
        title="No saved places yet"
        description="Tap the bookmark on any restaurant to build your personal shortlist for the trip. Saved places stay on this device."
        action={
          <Link
            href="/explore"
            className="inline-flex items-center justify-center rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-deep"
          >
            Browse restaurants
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate">
          {saved.length} saved {saved.length === 1 ? "place" : "places"}
        </p>
        <button
          type="button"
          onClick={clearSaved}
          className="text-sm font-medium text-accent hover:underline"
        >
          Clear all
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {saved.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </div>
    </div>
  );
}
