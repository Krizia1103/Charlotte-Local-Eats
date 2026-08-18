"use client";

import { useMemo, useState } from "react";
import RestaurantCard from "@/components/RestaurantCard";
import { CATEGORIES } from "@/lib/constants";
import type { Category, Restaurant } from "@/types/restaurant";

export default function MealTabBar({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  const [activeCategory, setActiveCategory] = useState<Category>("breakfast");
  const activeCategoryDetails = CATEGORIES.find(
    (category) => category.value === activeCategory
  );
  const activeRestaurants = useMemo(
    () =>
      restaurants
        .filter((restaurant) => restaurant.category.includes(activeCategory))
        .sort(
          activeCategory === "lunch"
            ? (a, b) =>
                a.walkingMinutes - b.walkingMinutes ||
                a.name.localeCompare(b.name)
            : (a, b) =>
                Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
                a.walkingMinutes - b.walkingMinutes ||
                a.name.localeCompare(b.name)
        ),
    [activeCategory, restaurants]
  );

  return (
    <section className="mt-10" aria-labelledby="meal-tabs-heading">
      <div className="flex flex-col gap-1 border-b border-lightgray pb-5">
        <p className="eyebrow text-accent">Choose an occasion</p>
        <h2 id="meal-tabs-heading" className="font-display text-3xl font-semibold text-navy">
          Find a place to eat
        </h2>
        <p className="text-sm leading-6 text-slate">
          Browse detailed local recommendations for colleagues, clients, and team
          breaks.
        </p>
      </div>

      <div
        className="mt-5 grid grid-cols-2 gap-1 rounded-card border border-lightgray bg-white p-1.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7"
        role="tablist"
        aria-label="Meal categories"
      >
        {CATEGORIES.map((category) => {
          const active = category.value === activeCategory;

          return (
            <button
              key={category.value}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`meal-panel-${category.value}`}
              id={`meal-tab-${category.value}`}
              onClick={() => setActiveCategory(category.value)}
              className={`rounded-lg px-3 py-3 text-sm font-semibold transition focus-visible:outline-offset-2 ${
                active
                  ? "bg-navy text-white shadow-sm"
                  : "text-charcoal hover:bg-accent-soft hover:text-accent"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <div
        id={`meal-panel-${activeCategory}`}
        role="tabpanel"
        aria-labelledby={`meal-tab-${activeCategory}`}
        className="mt-6"
      >
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-accent">{activeCategoryDetails?.shortLabel}</p>
            <h3 className="font-display mt-1 text-2xl font-semibold text-navy">
              {activeCategoryDetails?.label}
            </h3>
          </div>
          <p className="text-sm font-medium text-slate">
            {activeRestaurants.length} places
          </p>
        </div>
        <p className="mb-5 text-sm leading-6 text-slate">
          {activeCategoryDetails?.description}
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {activeRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
}
