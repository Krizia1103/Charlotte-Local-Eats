import { Suspense } from "react";
import ExploreClient from "@/components/ExploreClient";
import { CardSkeletonGrid } from "@/components/CardSkeleton";

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="pt-2">
          <CardSkeletonGrid count={6} />
        </div>
      }
    >
      <ExploreClient />
    </Suspense>
  );
}
