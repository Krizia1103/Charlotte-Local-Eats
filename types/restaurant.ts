/**
 * Core data types for the CLT Dining Guide.
 *
 * The guide is organized from the office at 300 South Tryon around four
 * practical use cases: coffee/smoothies, lunch, dinner, and happy hour.
 */

export type Category = "coffee" | "lunch" | "dinner" | "happyhour";

export type SortOption = "recommended" | "closest" | "name";

export type AttributeFilter =
  | "walkable"
  | "drive"
  | "local"
  | "chain"
  | "privateRoom"
  | "uberEats";

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  cuisine: string;
  category: Category[];
  description: string;
  whyGo: string;
  bestFor: string;
  vibe: string;
  walkingMinutes: number;
  isLocal: boolean;
  hasPrivateRoom: boolean;
  onUberEats: boolean;
  mapsUrl: string;
  websiteUrl: string;
  phone: string;
  featured?: boolean;
  notes?: string;
  privateRoomNotes?: string;
  deliveryNotes?: string;
}

export interface Filters {
  search: string;
  categories: Category[];
  attributes: AttributeFilter[];
  sort: SortOption;
}
