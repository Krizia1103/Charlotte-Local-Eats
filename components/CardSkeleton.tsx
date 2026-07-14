export default function CardSkeleton() {
  return (
    <div className="rounded-card border border-lightgray bg-white p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="w-full">
          <div className="skeleton h-4 w-2/3 rounded" />
          <div className="skeleton mt-2 h-3 w-1/3 rounded" />
        </div>
        <div className="skeleton h-9 w-9 rounded-full" />
      </div>
      <div className="mt-3 flex gap-1.5">
        <div className="skeleton h-5 w-16 rounded-full" />
        <div className="skeleton h-5 w-14 rounded-full" />
        <div className="skeleton h-5 w-12 rounded-full" />
      </div>
      <div className="skeleton mt-3 h-3 w-full rounded" />
      <div className="skeleton mt-2 h-3 w-5/6 rounded" />
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="skeleton h-8 rounded-lg" />
        <div className="skeleton h-8 rounded-lg" />
        <div className="skeleton h-8 rounded-lg" />
      </div>
    </div>
  );
}

export function CardSkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
