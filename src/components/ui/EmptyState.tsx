import { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  message?: string;
  action?: ReactNode;
};

export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center gap-2 py-14 px-6">
      <div className="font-serif text-lg text-text">{title}</div>
      {message && <div className="text-sm text-dim max-w-xs">{message}</div>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}