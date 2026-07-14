import type { Restaurant } from "@/types/restaurant";
import { WALKABLE_MINUTES } from "@/lib/constants";

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function walkingLabel(minutes: number): string {
  if (minutes === 0) return "Same building";
  return `${minutes} min walk`;
}

export function distanceModeLabel(restaurant: Restaurant): string {
  return restaurant.walkingMinutes <= WALKABLE_MINUTES ? "Walkable" : "Drive / Uber";
}

export function categoryLabel(value: Restaurant["category"][number]): string {
  switch (value) {
    case "coffee":
      return "Coffee / Smoothie";
    case "lunch":
      return "Lunch";
    case "dinner":
      return "Dinner";
    case "happyhour":
      return "Happy Hour";
  }
}

export function cardTags(r: Restaurant): string[] {
  const tags = [
    r.cuisine,
    distanceModeLabel(r),
    r.isLocal ? "Local" : "Chain",
  ];

  if (r.hasPrivateRoom) tags.push("Private room");
  if (r.onUberEats) tags.push("Uber Eats");
  if (r.notes) tags.push(r.notes);

  return tags;
}
