"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Restaurant } from "@/types/restaurant";
import { useSaved } from "@/lib/saved-context";
import {
  categoryLabel,
  distanceModeLabel,
  telHref,
  walkingLabel,
} from "@/lib/format";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  ClockIcon,
  CloseIcon,
  GlobeIcon,
  PhoneIcon,
  PinIcon,
  WalkIcon,
} from "@/components/icons";

interface DetailProps {
  restaurant: Restaurant;
  open: boolean;
  onClose: () => void;
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 border-t border-lightgray py-3 first:border-t-0">
      <span className="mt-0.5 text-accent">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate">
          {label}
        </p>
        <div className="mt-0.5 text-sm text-charcoal">{children}</div>
      </div>
    </div>
  );
}

export default function RestaurantDetail({
  restaurant,
  open,
  onClose,
}: DetailProps) {
  const { isSaved, toggleSaved, hydrated } = useSaved();
  const saved = hydrated && isSaved(restaurant.id);

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
            aria-label={`${restaurant.name} details`}
            initial={{ y: "100%", opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.4 }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-5 shadow-float sm:rounded-3xl"
          >
            <div className="sticky -top-5 -mx-5 -mt-5 mb-2 flex items-start justify-between gap-3 border-b border-lightgray bg-gradient-to-b from-white via-white to-white/95 px-5 pb-3 pt-5">
              <div className="min-w-0">
                <h2 className="font-display text-xl font-semibold text-navy">
                  {restaurant.name}
                </h2>
                <p className="mt-0.5 text-xs text-slate">
                  {restaurant.cuisine} &middot; {distanceModeLabel(restaurant)}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-lightgray text-slate transition hover:border-accent hover:text-accent"
              >
                <CloseIcon width={18} height={18} />
              </button>
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {restaurant.category.map((category) => (
                <span
                  key={category}
                  className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent"
                >
                  {categoryLabel(category)}
                </span>
              ))}
              <span className="rounded-full bg-offwhite px-2.5 py-1 text-[11px] font-medium text-charcoal ring-1 ring-inset ring-lightgray">
                {restaurant.isLocal ? "Local" : "Chain"}
              </span>
              {restaurant.onUberEats ? (
                <span className="rounded-full bg-offwhite px-2.5 py-1 text-[11px] font-medium text-charcoal ring-1 ring-inset ring-lightgray">
                  Uber Eats
                </span>
              ) : null}
              {restaurant.hasPrivateRoom ? (
                <span className="rounded-full bg-offwhite px-2.5 py-1 text-[11px] font-medium text-charcoal ring-1 ring-inset ring-lightgray">
                  Private room
                </span>
              ) : null}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-charcoal">
              {restaurant.description}
            </p>

            <div className="mt-4">
              <Row
                icon={<ClockIcon width={18} height={18} />}
                label="Why colleagues like it"
              >
                {restaurant.whyGo}
              </Row>
              <Row icon={<BookmarkIcon width={18} height={18} />} label="Best for">
                {restaurant.bestFor}
              </Row>
              <Row icon={<BookmarkIcon width={18} height={18} />} label="Private dining">
                {restaurant.hasPrivateRoom
                  ? restaurant.privateRoomNotes ?? "Private dining available; call to confirm details."
                  : "No confirmed private room in this guide."}
              </Row>
              <Row icon={<BookmarkIcon width={18} height={18} />} label="Lunch delivery">
                {restaurant.onUberEats
                  ? restaurant.deliveryNotes ?? "Listed as Uber Eats-friendly for lunch or delivery planning."
                  : "Not marked as an Uber Eats option in this guide."}
              </Row>
              <Row icon={<BookmarkIcon width={18} height={18} />} label="Vibe">
                {restaurant.vibe}
              </Row>
              <Row icon={<PinIcon width={18} height={18} />} label="Address">
                {restaurant.address}
              </Row>
              <Row icon={<WalkIcon width={18} height={18} />} label="Getting there">
                {walkingLabel(restaurant.walkingMinutes)} from 300 S Tryon.
              </Row>
              {restaurant.notes ? (
                <Row icon={<ClockIcon width={18} height={18} />} label="Note">
                  {restaurant.notes}
                </Row>
              ) : null}
            </div>

            <div className="sticky bottom-0 -mx-5 -mb-5 mt-5 space-y-3 border-t border-lightgray bg-white/95 px-5 py-4 backdrop-blur">
              <div className="grid grid-cols-4 gap-2">
                <a
                  href={restaurant.drivingDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-navy px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-deep"
                >
                  <PinIcon width={16} height={16} />
                  Drive
                </a>
                <a
                  href={restaurant.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open website"
                  className="inline-flex items-center justify-center rounded-lg border border-lightgray bg-white px-3 py-2.5 text-charcoal transition hover:border-accent hover:text-accent"
                >
                  <GlobeIcon width={18} height={18} />
                </a>
                <button
                  type="button"
                  onClick={() => toggleSaved(restaurant.id)}
                  aria-pressed={saved}
                  aria-label={saved ? "Remove from saved" : "Save restaurant"}
                  className={`inline-flex items-center justify-center rounded-lg border px-3 py-2.5 transition ${
                    saved
                      ? "border-accent bg-accent-soft text-accent"
                      : "border-lightgray bg-white text-charcoal hover:border-accent hover:text-accent"
                  }`}
                >
                  {saved ? (
                    <BookmarkFilledIcon width={18} height={18} />
                  ) : (
                    <BookmarkIcon width={18} height={18} />
                  )}
                </button>
                {restaurant.phone ? (
                  <a
                    href={telHref(restaurant.phone)}
                    aria-label="Call restaurant"
                    className="col-span-4 inline-flex items-center justify-center gap-1.5 rounded-lg border border-lightgray bg-white px-3 py-2 text-sm font-semibold text-charcoal transition hover:border-accent hover:text-accent"
                  >
                    <PhoneIcon width={16} height={16} />
                    Call {restaurant.phone}
                  </a>
                ) : null}
              </div>
              {restaurant.uberEatsUrl || restaurant.doorDashUrl ? (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate">
                    Order delivery
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {restaurant.uberEatsUrl ? (
                      <a
                        href={restaurant.uberEatsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg bg-[#06c167] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#05a959]"
                      >
                        Uber Eats
                      </a>
                    ) : null}
                    {restaurant.doorDashUrl ? (
                      <a
                        href={restaurant.doorDashUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg bg-[#ff3008] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#db2405]"
                      >
                        DoorDash
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
