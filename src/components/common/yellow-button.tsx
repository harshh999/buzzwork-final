import { type ReactNode } from "react";
import { motion } from "motion/react";

export function YellowButton({
  children,
  onClick,
  type,
  full,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  full?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      type={type ?? "button"}
      onClick={onClick}
      className={[
        "group relative inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--color-buzz-ink)] px-6 py-3 text-[14px] font-medium text-[color:var(--color-buzz-bg)] transition-all duration-500 hover:bg-[color:var(--color-buzz-yellow)] hover:text-[color:var(--color-buzz-ink)]",
        full ? "w-full" : "",
      ].join(" ")}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="translate-x-0 transition-transform duration-500 group-hover:translate-x-1"
      >
        →
      </span>
    </motion.button>
  );
}
