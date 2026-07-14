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
    value: "coffee",
    label: "Coffee / Smoothie",
    shortLabel: "Coffee",
    description: "Coffee, smoothies, pastries, and lighter morning options.",
  },
  {
    value: "lunch",
    label: "Lunch",
    shortLabel: "Lunch",
    description: "Walkable lunches plus Uber Eats-friendly local and chain picks.",
  },
  {
    value: "dinner",
    label: "Dinner / Client Meals",
    shortLabel: "Dinner",
    description: "Client-ready dinners split by private-room availability.",
  },
  {
    value: "happyhour",
    label: "Happy Hour",
    shortLabel: "Happy Hour",
    description: "After-work drinks split by walkable versus drive-worthy.",
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
