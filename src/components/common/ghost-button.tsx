import { type ReactNode } from "react";
import { motion } from "motion/react";

export function GhostButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={onClick}
      className="group relative inline-flex items-center gap-2 py-3 text-[14px] font-medium text-[color:var(--color-buzz-ink)]"
    >
      <span className="relative">
        {children}
        <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-100 bg-[color:var(--color-buzz-ink)] transition-transform duration-500 group-hover:scale-x-0" />
        <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-[color:var(--color-buzz-yellow)] transition-transform duration-500 group-hover:scale-x-100" />
      </span>
      <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
        →
      </span>
    </motion.button>
  );
}
