/**
 * Core data types for the CLT Dining Guide.
 *
 * The guide is organized from the office at 300 South Tryon around three
 * meal occasions: breakfast, coffee, lunch, dinner, happy hour, and desserts.
 */

export type Category =
  | "breakfast"
  | "coffee"
  | "lunch"
  | "dinner"
  | "happyhour"
  | "desserts";

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
  drivingDirectionsUrl: string;
  websiteUrl: string;
  phone: string;
  uberEatsUrl?: string;
  doorDashUrl?: string;
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
