"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import { restaurants } from "@/data/restaurants";
import { BASE_LOCATION, WALKABLE_MINUTES } from "@/lib/constants";
import { isWalkable } from "@/lib/useFilters";
import { categoryLabel, walkingLabel } from "@/lib/format";
import { MapIcon, PinIcon, WalkIcon } from "@/components/icons";

export default function MapView() {
  const [nearMeNote, setNearMeNote] = useState(false);

  const byDistance = useMemo(() => {
    const walkable = restaurants
      .filter(isWalkable)
      .sort((a, b) => a.walkingMinutes - b.walkingMinutes);
    const drive = restaurants
      .filter((r) => !isWalkable(r))
      .sort((a, b) => a.walkingMinutes - b.walkingMinutes);

    return [
      {
        title: `Walkable (${WALKABLE_MINUTES} min or less)`,
        places: walkable,
      },
      {
        title: "Drive / Uber",
        places: drive,
      },
    ];
  }, []);

  return (
    <div>
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2.5">
          <span aria-hidden className="rule-accent" />
          <p className="eyebrow text-accent">Orientation</p>
        </div>
        <h1 className="font-display text-[26px] font-semibold tracking-tight text-navy">
          Map &amp; distance
        </h1>
        <p className="mt-1 text-sm text-slate">
          Browse places relative to {BASE_LOCATION}.
        </p>
      </div>

      <section
        aria-label="Map placeholder"
        className="relative overflow-hidden rounded-card shadow-card"
        style={{ minHeight: 240 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1575506658814-c44c90bcbe43?w=1200&q=80&auto=format&fit=crop"
          alt="Charlotte skyline"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,28,44,0.60) 0%, rgba(5,28,44,0.80) 100%)",
          }}
        />
        <div className="relative flex flex-col items-center justify-center px-6 py-14 text-center text-white">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
            <MapIcon width={26} height={26} />
          </span>
          <h2 className="font-display mt-4 text-xl font-semibold">
            Interactive map coming soon
          </h2>
          <p className="mt-1.5 max-w-sm text-sm text-white/70">
            For now, use Open Maps on any venue for directions from 300 S Tryon.
          </p>
          <button
            type="button"
            onClick={() => setNearMeNote(true)}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-accent-soft"
          >
            <PinIcon width={16} height={16} />
            Near me
          </button>
          {nearMeNote ? (
            <p className="mt-3 text-xs text-white/70">
              Location-based search is not enabled in this version. Use the
              walkable and drive lists below.
            </p>
          ) : null}
        </div>
      </section>

      <div className="mt-8 space-y-6">
        {byDistance.map((group) => (
          <section key={group.title}>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-base font-semibold text-navy">
                <PinIcon width={16} height={16} className="text-accent" />
                {group.title}
              </h2>
              <span className="text-xs text-slate">
                {group.places.length}{" "}
                {group.places.length === 1 ? "spot" : "spots"}
              </span>
            </div>
            <ul className="divide-y divide-lightgray overflow-hidden rounded-card border border-lightgray bg-white shadow-card">
              {group.places.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/explore?q=${encodeURIComponent(r.name)}`}
                    className="flex items-center justify-between gap-3 px-4 py-3 transition hover:bg-offwhite"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-charcoal">
                        {r.name}
                      </p>
                      <p className="truncate text-xs text-slate">
                        {r.category.map(categoryLabel).join(", ")} &middot;{" "}
                        {r.isLocal ? "Local" : "Chain"}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-accent">
                      <WalkIcon width={14} height={14} />
                      {walkingLabel(r.walkingMinutes)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
