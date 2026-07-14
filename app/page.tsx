import Image from "next/image";
import Link from "next/link";
import { restaurants } from "@/data/restaurants";
import CategoryChips from "@/components/CategoryChips";
import FeaturedSection from "@/components/FeaturedSection";
import HomeSearch from "@/components/HomeSearch";
import { ArrowRightIcon } from "@/components/icons";
import { BASE_LOCATION, CATEGORIES } from "@/lib/constants";
import type { Category } from "@/types/restaurant";

function categoryPlaces(category: Category) {
  return restaurants
    .filter((r) => r.category.includes(category))
    .sort(
      (a, b) =>
        Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
        a.walkingMinutes - b.walkingMinutes ||
        a.name.localeCompare(b.name)
    );
}

export default function HomePage() {
  return (
    <div>
      <section
        className="relative overflow-hidden rounded-2xl shadow-float"
        style={{ minHeight: 340 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1562762394-3acfba62a48e?w=1400&q=85&auto=format&fit=crop"
          alt="Uptown Charlotte skyline at night"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,28,44,0.55) 0%, rgba(5,28,44,0.72) 50%, rgba(5,28,44,0.92) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(5,28,44,0.35) 0%, transparent 70%)",
          }}
        />

        <div className="relative px-6 py-11 text-white">
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="rule-accent" />
            <p className="eyebrow text-accent-bright/90">McKinsey Restaurant Guide</p>
          </div>
          <h1 className="font-display mt-4 text-[34px] font-semibold leading-[1.08] drop-shadow-sm sm:text-5xl">
            300 S Tryon
            <br />
            dining guide.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/78">
            Four practical lists for coffee, lunch, dinner, and happy hour,
            organized around walking distance, Uber Eats, and private-room needs.
          </p>
          <div className="mt-7">
            <HomeSearch />
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="sr-only">Browse by category</h2>
        <CategoryChips />
      </section>

      <section className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CATEGORIES.map((category) => (
          <Link
            key={category.value}
            href={`/explore?category=${category.value}`}
            className="group rounded-card border border-lightgray bg-white p-5 shadow-card transition hover:border-accent/40 hover:shadow-float"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow text-accent">{category.shortLabel}</p>
                <h2 className="font-display mt-2 text-xl font-semibold text-navy">
                  {category.label}
                </h2>
              </div>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy text-white transition group-hover:translate-x-0.5">
                <ArrowRightIcon width={18} height={18} />
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate">
              {category.description}
            </p>
            <p className="mt-4 text-xs font-semibold text-charcoal">
              {categoryPlaces(category.value).length} places
            </p>
          </Link>
        ))}
      </section>

      <FeaturedSection
        eyebrow="Coffee / Smoothie"
        title="Before the day starts"
        subtitle="Walkable coffee, smoothies, and pastry runs."
        restaurants={categoryPlaces("coffee").slice(0, 6)}
      />

      <FeaturedSection
        eyebrow="Lunch"
        title="Midday picks"
        subtitle="Local and chain options for walkable lunches or Uber Eats."
        restaurants={categoryPlaces("lunch").slice(0, 8)}
      />

      <FeaturedSection
        eyebrow="Dinner"
        title="Client meals"
        subtitle="Dinner options, with private-room context in the details."
        restaurants={categoryPlaces("dinner").slice(0, 8)}
      />

      <FeaturedSection
        eyebrow="Happy Hour"
        title="After-work drinks"
        subtitle="Walkable bars and destination happy hour ideas."
        restaurants={categoryPlaces("happyhour").slice(0, 8)}
      />

      <section className="mt-10">
        <Link
          href="/explore"
          className="group flex items-center justify-between rounded-card border border-lightgray bg-white px-5 py-4 shadow-card transition hover:border-accent/40 hover:shadow-float"
        >
          <div>
            <p className="text-sm font-semibold text-navy">
              Browse all {restaurants.length} venues
            </p>
            <p className="text-xs text-slate">
              Based from {BASE_LOCATION}; walkable means about 15 minutes or less.
            </p>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-white transition group-hover:translate-x-0.5">
            <ArrowRightIcon width={18} height={18} />
          </span>
        </Link>
      </section>

      <p className="mt-8 border-l-2 border-accent/40 bg-accent-soft/50 px-4 py-3 text-xs text-navy/70">
        Restaurant details, hours, and delivery availability can change. Confirm
        before sharing externally or booking client meals.
      </p>
    </div>
  );
}
