import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SectionLabel } from "@/components/common/section-label";

const LOGOS = [
  {
    name: "ARCZ",
    src: "/assets/logos/arcz.png",
    heightClass: "h-[32px] sm:h-[38px] lg:h-[42px]",
    maxWClass: "max-w-[80%]",
  },
  {
    name: "Pretty Good Therapist",
    src: "/assets/logos/pretty_good_therapist.png",
    heightClass: "h-[56px] sm:h-[68px] lg:h-[78px]",
    maxWClass: "max-w-[75%]",
  },
  {
    name: "Bark & Branch",
    src: "/assets/logos/bark_and_branch.png",
    heightClass: "h-[46px] sm:h-[54px] lg:h-[62px]",
    maxWClass: "max-w-[80%]",
  },
  {
    name: "BUILD",
    src: "/assets/logos/build.png",
    heightClass: "h-[30px] sm:h-[36px] lg:h-[40px]",
    maxWClass: "max-w-[75%]",
  },
];

export function TrustedBy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="trusted-by"
      ref={containerRef}
      className="relative border-t border-[color:var(--color-buzz-line)] py-24 sm:py-32 overflow-hidden bg-[color:var(--color-buzz-bg)]"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        {/* Section Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end mb-16 sm:mb-20">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <SectionLabel>TRUSTED BY</SectionLabel>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em]"
            >
              Brands we've helped bring to life.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="lg:col-span-4"
          >
            <p className="max-w-md text-[15px] leading-relaxed text-[color:var(--color-buzz-muted)]">
              A selection of brands and businesses we've partnered with across creative, branding and marketing.
            </p>
          </motion.div>
        </div>

        {/* Responsive Logo Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {LOGOS.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.25 + index * 0.1,
              }}
              className="group relative flex items-center justify-center bg-[#ffffff] border border-black/[0.06] rounded-[20px] p-6 sm:p-8 lg:p-10 min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer overflow-hidden"
            >
              <img
                src={logo.src}
                alt={`${logo.name} Logo`}
                className={`object-contain w-auto ${logo.heightClass} ${logo.maxWClass} select-none transition-transform duration-300 group-hover:scale-105`}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
