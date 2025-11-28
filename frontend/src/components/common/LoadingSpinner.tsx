export function LoadingSpinner({ size = 24 }: { size?: number }) {
  const px = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      role="status"
      aria-label="Loading"
      style={{ width: px, height: px }}
      className="inline-block animate-spin rounded-full border-4 border-primary-600 border-t-transparent"
    />
  );
}
