import { motion } from "motion/react";
import { type ReactNode } from "react";

export function PaperGrain() {
  return <div aria-hidden className="paper-grain-layer" />;
}

export function YellowPulse() {
  return (
    <span className="relative inline-flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-buzz-yellow)] opacity-60" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-buzz-yellow)]" />
    </span>
  );
}

export function YellowDotSep() {
  return (
    <span
      aria-hidden
      className="mx-2 inline-block h-1 w-1 rounded-full bg-[color:var(--color-buzz-yellow)] align-middle"
    />
  );
}

export function BillboardDivider() {
  return (
    <span aria-hidden className="hidden items-center gap-1 sm:inline-flex">
      <span className="h-px w-6 bg-[color:var(--color-buzz-ink)]/40" />
      <span className="h-2 w-px bg-[color:var(--color-buzz-yellow)]" />
      <span className="h-px w-6 bg-[color:var(--color-buzz-ink)]/40" />
    </span>
  );
}

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M12 2 13.6 9.4 21 11l-7.4 1.6L12 20l-1.6-7.4L3 11l7.4-1.6L12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function HandArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 10 C 32 6, 58 14, 78 34 S 104 62, 112 70" />
      <path d="M112 70 L 98 66" />
      <path d="M112 70 L 106 56" />
    </svg>
  );
}

export function MarkerUnderline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 12" preserveAspectRatio="none" className={className} aria-hidden>
      <path
        d="M2 7 C 40 2, 80 10, 120 5 S 180 8, 198 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

export function AnimatedHighlight({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className || ""}`}>
      <span className="relative z-10">{children}</span>
      <svg
        className="absolute -bottom-2 -left-2 -right-2 h-[calc(100%+16px)] w-[calc(100%+16px)] pointer-events-none"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 5,20 C 15,5 85,0 95,15 C 105,30 80,40 50,38 C 20,35 0,25 8,15"
          fill="none"
          stroke="var(--color-buzz-yellow)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
        />
      </svg>
    </span>
  );
}

export function FloatingKeywords({ x, y, scrollY }: { x: any; y: any; scrollY: any }) {
  const words = [
    { text: "SOCIAL", top: "20%", left: "8%", delay: 0 },
    { text: "CONTENT", top: "15%", left: "82%", delay: 0.2 },
    { text: "CREATIVE", top: "75%", left: "6%", delay: 0.4 },
    { text: "CULTURE", top: "65%", left: "85%", delay: 0.6 },
    { text: "STRATEGY", top: "85%", left: "70%", delay: 0.8 },
  ];

  return (
    <motion.div style={{ y: scrollY }} className="pointer-events-none absolute inset-0 z-0 hidden lg:block overflow-hidden">
      {words.map((w, i) => (
        <motion.div
          key={i}
          className="absolute text-[11px] font-medium tracking-[0.25em] uppercase text-[color:var(--color-buzz-ink)]/15"
          style={{ top: w.top, left: w.left, x, y }}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: [0, -15, 0],
          }}
          transition={{
            opacity: { duration: 1.5, delay: 1 + w.delay },
            y: {
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {w.text}
        </motion.div>
      ))}
    </motion.div>
  );
}

