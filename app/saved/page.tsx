import SavedRestaurants from "@/components/SavedRestaurants";

export default function SavedPage() {
  return (
    <div>
      <div className="mb-5">
        <div className="mb-2 flex items-center gap-2.5">
          <span aria-hidden className="rule-accent" />
          <p className="eyebrow text-accent">Your shortlist</p>
        </div>
        <h1 className="font-display text-[26px] font-semibold tracking-tight text-navy">
          Saved places
        </h1>
        <p className="mt-1 text-sm text-slate">
          Stored on this device for your trip.
        </p>
      </div>
      <SavedRestaurants />
    </div>
  );
}
