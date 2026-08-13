export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="none">
      <path
        d="M6 6h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H14l-6 5v-5H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        fill="var(--color-buzz-yellow)"
      />
      <circle cx="12" cy="14" r="1.3" fill="var(--color-buzz-ink)" />
      <circle cx="16" cy="14" r="1.3" fill="var(--color-buzz-ink)" />
      <circle cx="20" cy="14" r="1.3" fill="var(--color-buzz-ink)" />
    </svg>
  );
}
