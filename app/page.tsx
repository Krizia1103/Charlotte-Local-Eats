import Image from "next/image";
import Link from "next/link";
import { restaurants } from "@/data/restaurants";
import HomeSearch from "@/components/HomeSearch";
import MealTabBar from "@/components/MealTabBar";
import WeatherWidget from "@/components/WeatherWidget";
import { ArrowRightIcon } from "@/components/icons";
import { BASE_LOCATION } from "@/lib/constants";

export default function HomePage() {
  return (
    <div>
      <section
        className="relative overflow-hidden rounded-2xl shadow-float"
        style={{ minHeight: 280 }}
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

        <div className="relative flex flex-col gap-5 px-6 py-9 text-white sm:px-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5">
              <span aria-hidden className="rule-accent" />
              <p className="eyebrow text-accent-bright/90">Charlotte Restaurant Guide</p>
            </div>
            <h1 className="font-display mt-4 text-[34px] font-semibold leading-[1.08] drop-shadow-sm sm:text-5xl">
              Charlotte Office{" "}
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                Eats
                <WeatherWidget compact className="md:hidden" />
              </span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/78">
              Local breakfast, lunch, dinner, and dessert spots for colleagues and team breaks.
            </p>
            <div className="mt-7">
              <HomeSearch />
            </div>
          </div>
          <WeatherWidget className="hidden shrink-0 md:block" />
        </div>
      </section>

      <MealTabBar restaurants={restaurants} />

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
