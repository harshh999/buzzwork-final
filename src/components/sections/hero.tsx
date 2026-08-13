import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import {
  YellowPulse,
  BillboardDivider,
  Sparkle,
  HandArrow,
  YellowDotSep,
  AnimatedHighlight,
  FloatingKeywords,
} from "@/components/common/creative-accents";
import { RevealWords } from "@/components/common/reveal-words";
import { FadeIn } from "@/components/common/fade-in";
import { YellowButton } from "@/components/common/yellow-button";
import { GhostButton } from "@/components/common/ghost-button";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mouseX = useSpring(0, { damping: 40, stiffness: 100, mass: 0.8 });
  const mouseY = useSpring(0, { damping: 40, stiffness: 100, mass: 0.8 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 1024) {
        mouseX.set((e.clientX - window.innerWidth / 2) * -0.03);
        mouseY.set((e.clientY - window.innerHeight / 2) * -0.03);
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const floatingYScroll = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <FloatingKeywords x={mouseX} y={mouseY} scrollY={floatingYScroll} />

      <div className="mx-auto w-full max-w-[1240px] px-6 pt-40 pb-24 sm:px-8 sm:pt-48 sm:pb-32 relative z-10">
        <motion.div style={{ y, opacity }}>
          <FadeIn delay={0.05}>
            <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-[color:var(--color-buzz-muted)]">
              <span>BUZZWORK — SOCIAL · CONTENT · CULTURE</span>
            </div>
          </FadeIn>

          <h1 className="mt-8 max-w-[16ch] font-display text-[clamp(2.75rem,8vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.035em]">
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block origin-bottom"
                initial={{ y: "100%", opacity: 0, rotate: 2 }}
                animate={{ y: "0%", opacity: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                Content that
              </motion.span>
            </span>
            <span className="block overflow-hidden text-[color:var(--color-buzz-muted)] pb-2 -mt-1">
              <motion.span
                className="block origin-bottom"
                initial={{ y: "100%", opacity: 0, rotate: 2 }}
                animate={{ y: "0%", opacity: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              >
                builds brands.
              </motion.span>
            </span>
          </h1>

          <FadeIn delay={0.5}>
            <p className="mt-10 max-w-xl text-[17px] leading-relaxed text-[color:var(--color-buzz-muted)]">
              We combine strategy, creativity, and consistency to turn{" "}
              <AnimatedHighlight className="text-[color:var(--color-buzz-ink)]">attention</AnimatedHighlight>{" "}
              into lasting brand value.
            </p>
          </FadeIn>

          <FadeIn delay={0.65}>
            <div className="mt-12 flex flex-wrap items-center gap-4 relative">
              <HandArrow className="absolute -left-16 -top-8 hidden h-14 w-14 -rotate-[18deg] text-[color:var(--color-buzz-ink)]/70 lg:block" />
              <YellowButton
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Let's Talk
              </YellowButton>
              <GhostButton
                onClick={() =>
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Services
              </GhostButton>
            </div>
          </FadeIn>
        </motion.div>

        <FadeIn delay={0.9}>
          <div className="mt-24 sm:mt-32 w-full border-t border-black/10 py-[18px] text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-normal text-black/55 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Mobile Layout */}
            <div className="flex justify-between items-start w-full lg:hidden">
              <div className="text-left w-[55%] leading-[1.6]">
                BUZZWORK — CREATIVE MARKETING AGENCY
              </div>
              <div className="text-right flex items-center gap-1.5 shrink-0 pt-0.5">
                SCROLL TO EXPLORE
                <motion.span
                  animate={{ y: [0, 3.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block"
                >
                  ↓
                </motion.span>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid grid-cols-3 items-center w-full">
              <div className="text-left">
                BUZZWORK — CREATIVE MARKETING AGENCY
              </div>
              <div className="text-center flex items-center justify-center gap-3">
                SOCIAL <span className="inline-block h-[3px] w-[3px] rounded-full bg-[color:var(--color-buzz-yellow)]" /> CONTENT <span className="inline-block h-[3px] w-[3px] rounded-full bg-[color:var(--color-buzz-yellow)]" /> CAMPAIGNS
              </div>
              <div className="text-right flex items-center justify-end gap-1.5">
                SCROLL TO EXPLORE
                <motion.span
                  animate={{ y: [0, 3.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block"
                >
                  ↓
                </motion.span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
