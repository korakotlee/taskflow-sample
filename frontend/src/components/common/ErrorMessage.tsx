// small presentational component

interface ErrorMessageProps {
  error?: unknown;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  const message =
    error && typeof error === 'object' && 'message' in (error as any)
      ? (error as any).message
      : String(error ?? 'An unexpected error occurred');

  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
      {message}
    </div>
  );
}
