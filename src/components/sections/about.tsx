import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SectionLabel } from "@/components/common/section-label";
import { MarkerUnderline } from "@/components/common/creative-accents";

const GALLERY = [
  { src: "/images/image_1.jpg", label: "Creative Production", meta: "CONTENT • PRODUCTION" },
  { src: "/images/image_2.jpg", label: "Brand Strategy", meta: "POSITIONING • IDENTITY" },
  { src: "/images/image_3.jpg", label: "Social Media Management", meta: "CONTENT • GROWTH" },
];

export function About() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const isHeadlineInView = useInView(headlineRef, { once: true, margin: "-100px" });

  const statementRef = useRef<HTMLDivElement>(null);
  const isStatementInView = useInView(statementRef, { once: true, margin: "-150px" });

  return (
    <section
      id="about"
      className="relative border-t border-[color:var(--color-buzz-line)] pt-32 sm:pt-40 overflow-hidden"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isHeadlineInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <SectionLabel>About</SectionLabel>
        </motion.div>

        {/* Headline Section */}
        <div className="mt-10 max-w-4xl" ref={headlineRef}>
          <h2 className="font-display text-[clamp(2.5rem,6.5vw,6rem)] font-medium leading-[0.98] tracking-[-0.035em] flex flex-col">
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block origin-bottom"
                initial={{ y: "100%", opacity: 0 }}
                animate={isHeadlineInView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                Every brand has a voice.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-4 relative">
              <motion.span
                className="block origin-bottom text-[color:var(--color-buzz-muted)] relative inline-block"
                initial={{ y: "100%", opacity: 0 }}
                animate={isHeadlineInView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                We make it unforgettable.
                <MarkerUnderline className="absolute -bottom-2 left-0 h-3 w-[95%] text-[color:var(--color-buzz-yellow)]" />
              </motion.span>
            </span>
          </h2>
        </div>

        {/* Copy Section */}
        <div className="mt-[70px] md:mt-[90px] grid gap-12 lg:grid-cols-12 lg:gap-16 mb-[90px] md:mb-[120px]">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 12 }}
            animate={isHeadlineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            <p className="text-[17px] leading-relaxed">
              Great brands aren't built by chance. They're built through clear strategy, consistent
              storytelling, and content people actually remember. That's where we come in.
            </p>
          </motion.div>
          <motion.div
            className="lg:col-span-5 lg:col-start-7"
            initial={{ opacity: 0, y: 12 }}
            animate={isHeadlineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          >
            <p className="text-[17px] leading-relaxed text-[color:var(--color-buzz-muted)]">
              From brand strategy and social media management to creative production, we help
              ambitious businesses earn attention, build trust, and create lasting brand value.
            </p>
          </motion.div>
        </div>

        {/* Large Brand Statement */}
        <div
          className="pt-[60px] pb-[110px] flex flex-col items-start text-left max-w-[1000px]"
          ref={statementRef}
        >
          <h3 className="font-display text-[clamp(2rem,5vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.04em] flex flex-col gap-y-1">
            <span className="block overflow-hidden w-full pb-1">
              <motion.span
                className="block origin-bottom"
                initial={{ y: "100%", opacity: 0 }}
                animate={isStatementInView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
              >
                WE DON'T CHASE ATTENTION.
              </motion.span>
            </span>
            <span className="block overflow-hidden w-full pb-2 relative">
              <motion.span
                className="block origin-bottom inline-block relative"
                initial={{ y: "100%", opacity: 0 }}
                animate={isStatementInView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.65, ease: "easeOut", delay: 0.18 }}
              >
                WE BUILD THE KIND THAT{" "}
                <span className="relative inline-block">
                  STAYS.
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isStatementInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
                    className="absolute -bottom-1 left-0 h-[3px] w-full bg-[color:var(--color-buzz-yellow)] origin-left"
                  />
                </span>
              </motion.span>
            </span>
          </h3>
        </div>

        {/* Work Preview */}
        <div className="pt-[70px] md:pt-[90px] pb-32 sm:pb-40 border-t border-[color:var(--color-buzz-line)]">
          <EditorialGallery />
        </div>
      </div>
    </section>
  );
}

function EditorialGallery() {
  return (
    <div className="w-full">
      <div className="mb-10 flex items-center justify-between text-[12px] uppercase tracking-[0.2em] text-[color:var(--color-buzz-muted)]">
        <span className="flex items-center gap-2">WHAT WE'VE BEEN BUILDING</span>
        <span></span>
      </div>
      <div className="grid gap-[18px] sm:gap-[24px] md:grid-cols-3">
        {GALLERY.map((g, i) => (
          <GalleryTile key={g.label} item={g} index={i} />
        ))}
      </div>
    </div>
  );
}

interface GalleryTileProps {
  item: (typeof GALLERY)[number];
  index: number;
}

function GalleryTile({ item, index }: GalleryTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
      className="group cursor-pointer flex flex-col"
    >
      <div className="relative overflow-hidden rounded-[4px] bg-[color:var(--color-buzz-line)]">
        <div className="aspect-[3/4] w-full overflow-hidden">
          <img
            src={item.src}
            alt={item.label}
            width={1200}
            height={1600}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.025]"
          />
        </div>
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-4 left-4 h-2 w-2 rounded-full bg-[color:var(--color-buzz-yellow)] opacity-0 transition-opacity duration-[400ms] ease-out group-hover:opacity-100 shadow-[0_0_8px_rgba(238,206,12,0.6)]"
        />
      </div>
      <div className="mt-4 flex flex-col items-start justify-start text-left transition-transform duration-[400ms] ease-out group-hover:-translate-y-1">
        <span className="text-[14px] font-medium tracking-[0.05em] text-[color:var(--color-buzz-ink)] mb-1 uppercase">
          {item.label}
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-buzz-muted)]">
          {item.meta}
        </span>
      </div>
    </motion.div>
  );
}
