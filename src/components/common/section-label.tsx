import { type ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.22em] text-[color:var(--color-buzz-muted)]">
      {children}
    </div>
  );
}
