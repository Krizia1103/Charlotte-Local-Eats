import type { Restaurant } from "@/types/restaurant";
import RestaurantCard from "@/components/RestaurantCard";

interface FeaturedSectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  restaurants: Restaurant[];
}

/**
 * Horizontally scrollable row of restaurant cards used for the home page
 * "Featured", "Tonight's picks", and curated collections.
 */
export default function FeaturedSection({
  eyebrow,
  title,
  subtitle,
  restaurants,
}: FeaturedSectionProps) {
  if (restaurants.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="mb-4">
        {eyebrow ? (
          <div className="mb-2 flex items-center gap-2.5">
            <span aria-hidden className="rule-accent" />
            <p className="eyebrow text-accent">{eyebrow}</p>
          </div>
        ) : null}
        <h2 className="font-display text-[22px] font-semibold leading-tight text-navy">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-slate">{subtitle}</p>
        ) : null}
      </div>
      <div className="-mx-4 snap-x snap-mandatory overflow-x-auto px-4 pb-2 no-scrollbar">
        <div className="flex w-max gap-4">
          {restaurants.map((r) => (
            <div key={r.id} className="w-[min(280px,80vw)] shrink-0 snap-start">
              <RestaurantCard restaurant={r} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
