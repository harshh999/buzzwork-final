import { useRef } from "react";
import { motion, useInView } from "motion/react";

export function RevealWords({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={["block overflow-hidden", className ?? ""].join(" ")}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pr-[0.25em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.05,
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
