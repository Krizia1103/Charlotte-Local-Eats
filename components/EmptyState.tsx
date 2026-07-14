import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-lightgray bg-white px-6 py-14 text-center">
      {icon ? (
        <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-offwhite text-slate">
          {icon}
        </div>
      ) : null}
      <h3 className="font-display text-lg font-semibold text-navy">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-slate">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
