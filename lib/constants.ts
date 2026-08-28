import type {
  AttributeFilter,
  Category,
  Filters,
  SortOption,
} from "@/types/restaurant";

export const BASE_LOCATION = "300 S Tryon St, Charlotte, NC 28202";

export const WALKABLE_MINUTES = 15;

export const CATEGORIES: {
  value: Category;
  label: string;
  shortLabel: string;
  description: string;
}[] = [
  {
    value: "breakfast",
    label: "Breakfast",
    shortLabel: "Breakfast",
    description: "Coffee, smoothies, pastries, and lighter options before the day starts.",
  },
  {
    value: "coffee",
    label: "Coffee",
    shortLabel: "Coffee",
    description: "Coffee shops and cafe stops for a quick pick-me-up or informal meeting.",
  },
  {
    value: "lunch",
    label: "Lunch",
    shortLabel: "Lunch",
    description: "Walkable lunches plus Uber Eats-friendly local and chain picks.",
  },
  {
    value: "dinner",
    label: "Dinner",
    shortLabel: "Dinner",
    description: "Colleague and client dinners, including private-room availability.",
  },
  {
    value: "happyhour",
    label: "Happy Hour",
    shortLabel: "Happy Hour",
    description: "After-work drinks and relaxed team gatherings around Charlotte.",
  },
  {
    value: "desserts",
    label: "Desserts",
    shortLabel: "Desserts",
    description: "Local sweet stops for an afternoon pick-me-up or a post-meal treat.",
  },
];

export const CATEGORY_CHIPS = CATEGORIES;

export const ATTRIBUTE_FILTERS: {
  value: AttributeFilter;
  label: string;
}[] = [
  { value: "walkable", label: "Walkable" },
  { value: "drive", label: "Drive / Uber" },
  { value: "local", label: "Local" },
  { value: "chain", label: "Chain" },
  { value: "privateRoom", label: "Private room" },
  { value: "uberEats", label: "Uber Eats" },
];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "closest", label: "Closest" },
  { value: "name", label: "A-Z" },
];

export const DEFAULT_FILTERS: Filters = {
  search: "",
  categories: [],
  attributes: [],
  sort: "recommended",
};
