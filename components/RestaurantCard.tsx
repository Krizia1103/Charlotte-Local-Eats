"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Restaurant } from "@/types/restaurant";
import { useSaved } from "@/lib/saved-context";
import { cardTags, telHref, walkingLabel } from "@/lib/format";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  GlobeIcon,
  PhoneIcon,
  PinIcon,
  WalkIcon,
} from "@/components/icons";
import RestaurantDetail from "@/components/RestaurantDetail";

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const { isSaved, toggleSaved, hydrated } = useSaved();
  const [detailOpen, setDetailOpen] = useState(false);
  const saved = hydrated && isSaved(restaurant.id);

  function stop(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setDetailOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${restaurant.name}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setDetailOpen(true);
          }
        }}
        className="group cursor-pointer rounded-card border border-lightgray bg-white p-4 shadow-card transition hover:border-accent/40 hover:shadow-float focus-visible:border-accent"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-display truncate text-[17px] font-semibold text-navy">
                {restaurant.name}
              </h3>
              {restaurant.featured ? (
                <span className="shrink-0 rounded-sm border border-accent/30 bg-accent-soft px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-accent">
                  Featured
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-slate">
              {restaurant.cuisine}
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              stop(e);
              toggleSaved(restaurant.id);
            }}
            aria-pressed={saved}
            aria-label={saved ? "Remove from saved" : "Save restaurant"}
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition ${
              saved
                ? "border-accent bg-accent-soft text-accent"
                : "border-lightgray bg-white text-slate hover:border-accent hover:text-accent"
            }`}
          >
            {saved ? (
              <BookmarkFilledIcon width={18} height={18} />
            ) : (
              <BookmarkIcon width={18} height={18} />
            )}
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {cardTags(restaurant).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-offwhite px-2.5 py-1 text-[11px] font-medium text-charcoal ring-1 ring-inset ring-lightgray"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-charcoal/90">
          {restaurant.description}
        </p>

        <dl className="mt-3 grid grid-cols-1 gap-1.5 text-xs text-slate">
          <div className="flex gap-1.5">
            <dt className="font-semibold text-charcoal">Vibe:</dt>
            <dd className="truncate">{restaurant.vibe}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="font-semibold text-charcoal">Best for:</dt>
            <dd className="truncate">{restaurant.bestFor}</dd>
          </div>
        </dl>

        <div className="mt-3 flex items-center gap-3 text-xs text-slate">
          <span className="inline-flex min-w-0 items-center gap-1">
            <PinIcon width={14} height={14} />
            <span className="truncate">{restaurant.address}</span>
          </span>
        </div>
        <div className="mt-1.5 flex items-center gap-1 text-xs font-medium text-accent">
          <WalkIcon width={14} height={14} />
          {walkingLabel(restaurant.walkingMinutes)} from 300 S Tryon
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <a
            href={restaurant.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stop}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-navy px-2 py-2 text-xs font-semibold text-white transition hover:bg-navy-deep"
          >
            <PinIcon width={15} height={15} />
            Maps
          </a>
          <a
            href={restaurant.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stop}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-lightgray bg-white px-2 py-2 text-xs font-semibold text-charcoal transition hover:border-accent hover:text-accent"
          >
            <GlobeIcon width={15} height={15} />
            Site
          </a>
          {restaurant.phone ? (
            <a
              href={telHref(restaurant.phone)}
              onClick={stop}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-lightgray bg-white px-2 py-2 text-xs font-semibold text-charcoal transition hover:border-accent hover:text-accent"
            >
              <PhoneIcon width={15} height={15} />
              Call
            </a>
          ) : (
            <span className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-lightgray bg-offwhite px-2 py-2 text-xs font-semibold text-slate">
              <PhoneIcon width={15} height={15} />
              Call
            </span>
          )}
        </div>
      </motion.article>

      <RestaurantDetail
        restaurant={restaurant}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </>
  );
}
