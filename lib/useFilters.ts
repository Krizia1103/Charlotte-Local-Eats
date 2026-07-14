"use client";

import { useMemo, useState } from "react";
import type {
  AttributeFilter,
  Category,
  Filters,
  Restaurant,
  SortOption,
} from "@/types/restaurant";
import { DEFAULT_FILTERS, WALKABLE_MINUTES } from "@/lib/constants";

export interface RestaurantGroup {
  title: string;
  description: string;
  restaurants: Restaurant[];
}

export function isWalkable(restaurant: Restaurant): boolean {
  return restaurant.walkingMinutes <= WALKABLE_MINUTES;
}

function matchesSearch(r: Restaurant, query: string): boolean {
  if (!query.trim()) return true;
  const haystack = [
    r.name,
    r.address,
    r.cuisine,
    r.description,
    r.whyGo,
    r.bestFor,
    r.vibe,
    r.notes,
    r.privateRoomNotes,
    r.deliveryNotes,
    r.isLocal ? "local Charlotte" : "chain",
    r.hasPrivateRoom ? "private room private dining" : "no private room",
    r.onUberEats ? "Uber Eats delivery" : "",
    isWalkable(r) ? "walkable walking" : "drive Uber",
    ...r.category,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return query
    .toLowerCase()
    .split(/\s+/)
    .every((token) => haystack.includes(token));
}

function matchesAttribute(r: Restaurant, attr: AttributeFilter): boolean {
  switch (attr) {
    case "walkable":
      return isWalkable(r);
    case "drive":
      return !isWalkable(r);
    case "local":
      return r.isLocal;
    case "chain":
      return !r.isLocal;
    case "privateRoom":
      return r.hasPrivateRoom;
    case "uberEats":
      return r.onUberEats;
    default:
      return true;
  }
}

function sortRestaurants(list: Restaurant[], sort: SortOption): Restaurant[] {
  const copy = [...list];
  switch (sort) {
    case "closest":
      return copy.sort(
        (a, b) =>
          a.walkingMinutes - b.walkingMinutes || a.name.localeCompare(b.name)
      );
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "recommended":
    default:
      return copy.sort(
        (a, b) =>
          Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
          a.walkingMinutes - b.walkingMinutes ||
          a.name.localeCompare(b.name)
      );
  }
}

export function applyFilters(
  restaurants: Restaurant[],
  filters: Filters
): Restaurant[] {
  const filtered = restaurants.filter((r) => {
    if (!matchesSearch(r, filters.search)) return false;
    if (
      filters.categories.length > 0 &&
      !filters.categories.some((c) => r.category.includes(c))
    ) {
      return false;
    }
    if (
      filters.attributes.length > 0 &&
      !filters.attributes.every((attr) => matchesAttribute(r, attr))
    ) {
      return false;
    }
    return true;
  });

  return sortRestaurants(filtered, filters.sort);
}

function sortGroup(list: Restaurant[]): Restaurant[] {
  return [...list].sort(
    (a, b) => a.walkingMinutes - b.walkingMinutes || a.name.localeCompare(b.name)
  );
}

export function categoryLabel(category: Category): string {
  switch (category) {
    case "coffee":
      return "Coffee / Smoothie";
    case "lunch":
      return "Lunch";
    case "dinner":
      return "Dinner / Client Meals";
    case "happyhour":
      return "Happy Hour";
  }
}

export function getCategoryGroups(
  restaurants: Restaurant[],
  category?: Category
): RestaurantGroup[] {
  if (!category) {
    const categories: Category[] = ["coffee", "lunch", "dinner", "happyhour"];
    return categories
      .map((c) => ({
        title: categoryLabel(c),
        description: "All matching places in this category.",
        restaurants: sortGroup(restaurants.filter((r) => r.category.includes(c))),
      }))
      .filter((g) => g.restaurants.length > 0);
  }

  const list = restaurants.filter((r) => r.category.includes(category));

  if (category === "lunch") {
    return [
      {
        title: "Walkable local",
        description: "Local lunch spots within about a 15-minute walk.",
        restaurants: sortGroup(list.filter((r) => isWalkable(r) && r.isLocal)),
      },
      {
        title: "Walkable chains",
        description: "Chain lunch options within about a 15-minute walk.",
        restaurants: sortGroup(list.filter((r) => isWalkable(r) && !r.isLocal)),
      },
      {
        title: "Uber Eats local",
        description: "Local lunch options better handled by delivery or car.",
        restaurants: sortGroup(
          list.filter((r) => !isWalkable(r) && r.isLocal && r.onUberEats)
        ),
      },
      {
        title: "Uber Eats chains",
        description: "Chain lunch options better handled by delivery.",
        restaurants: sortGroup(
          list.filter((r) => !isWalkable(r) && !r.isLocal && r.onUberEats)
        ),
      },
    ].filter((g) => g.restaurants.length > 0);
  }

  if (category === "dinner") {
    return [
      {
        title: "Has private room",
        description: "Client-meal candidates with confirmed or listed private dining.",
        restaurants: sortGroup(list.filter((r) => r.hasPrivateRoom)),
      },
      {
        title: "No confirmed private room",
        description: "Dinner candidates without a confirmed private room.",
        restaurants: sortGroup(list.filter((r) => !r.hasPrivateRoom)),
      },
    ].filter((g) => g.restaurants.length > 0);
  }

  return [
    {
      title: "Walkable",
      description: "Within about a 15-minute walk from 300 S Tryon.",
      restaurants: sortGroup(list.filter(isWalkable)),
    },
    {
      title: "Drive",
      description: "Better for a car, rideshare, or planned outing.",
      restaurants: sortGroup(list.filter((r) => !isWalkable(r))),
    },
  ].filter((g) => g.restaurants.length > 0);
}

export function activeFilterCount(filters: Filters): number {
  return filters.categories.length + filters.attributes.length;
}

export function useFilters(
  restaurants: Restaurant[],
  initial?: Partial<Filters>
) {
  const [filters, setFilters] = useState<Filters>({
    ...DEFAULT_FILTERS,
    ...initial,
  });

  const results = useMemo(
    () => applyFilters(restaurants, filters),
    [restaurants, filters]
  );

  function toggleArrayValue<K extends keyof Filters>(
    key: K,
    value: Filters[K] extends Array<infer T> ? T : never
  ) {
    setFilters((prev) => {
      const arr = prev[key] as unknown as unknown[];
      const exists = arr.includes(value);
      return {
        ...prev,
        [key]: exists
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      } as Filters;
    });
  }

  function setField<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function reset() {
    setFilters({ ...DEFAULT_FILTERS });
  }

  return {
    filters,
    setFilters,
    results,
    toggleArrayValue,
    setField,
    reset,
    activeCount: activeFilterCount(filters),
  };
}
