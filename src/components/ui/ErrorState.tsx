import { Button } from "./Button";

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-14 px-6">
      <div className="text-sm text-dim max-w-xs">{message}</div>
      {onRetry && (
        <Button variant="ghost" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}