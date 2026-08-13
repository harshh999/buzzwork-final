import { useEffect, useState } from "react";
import { FadeIn } from "@/components/common/fade-in";
import { SectionLabel } from "@/components/common/section-label";
import { MarkerUnderline } from "@/components/common/creative-accents";

const WORK_ITEMS = [
  {
    id: 1,
    asset: "/images/selected-work/selected-work-01.jpeg",
    title: "The Shoot Floor",
    label: "PRODUCTION • BTS",
    type: "PRODUCTION",
    aspect: "aspect-[4/5]",
  },
  {
    id: 2,
    asset: "/images/selected-work/selected-work-02.jpeg",
    title: "Inside the Brand",
    label: "BRAND • CONTENT",
    type: "BRAND",
    aspect: "aspect-[9/16]",
  },
  {
    id: 3,
    asset: "/images/selected-work/selected-work-03.jpeg",
    title: "On Set",
    label: "PRODUCTION • VIDEO",
    type: "PRODUCTION",
    aspect: "aspect-square",
  },
  {
    id: 4,
    asset: "/images/selected-work/selected-work-04.jpeg",
    title: "Open Air",
    label: "CAMPAIGN • PRODUCTION",
    type: "CAMPAIGN",
    aspect: "aspect-[4/5]",
  },
  {
    id: 5,
    asset: "/images/selected-work/selected-work-05.jpeg",
    title: "Behind the Lens",
    label: "SOCIAL • CONTENT",
    type: "SOCIAL",
    aspect: "aspect-[9/16]",
  },
  {
    id: 6,
    asset: "/images/selected-work/selected-work-06.jpeg",
    title: "The Studio Run",
    label: "PRODUCTION • VIDEO",
    type: "PRODUCTION",
    aspect: "aspect-square",
  },
  {
    id: 7,
    asset: "/images/selected-work/selected-work-07.jpeg",
    title: "Brand in Motion",
    label: "CONTENT • PRODUCTION",
    type: "CONTENT",
    aspect: "aspect-[4/5]",
  },
];

export function Work() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return (
    <section
      id="work"
      className="marquee-section relative w-full border-t border-[color:var(--color-buzz-line)] py-24 sm:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8 mb-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <FadeIn>
              <SectionLabel>Selected Work</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em]">
                Social, content & campaigns built for{" "}
                <span className="relative inline-block">
                  <em className="not-italic">attention</em>
                  <MarkerUnderline className="absolute -bottom-1 left-0 h-2 w-full text-[color:var(--color-buzz-yellow)]" />
                </span>
                .
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} className="lg:col-span-4">
            <p className="max-w-md text-[15px] leading-relaxed text-[color:var(--color-buzz-muted)]">
              A selection of the work we create across social media, content production, branding and campaigns.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Marquee Viewport */}
      <div className="marquee-viewport relative w-full overflow-hidden py-4">
        {/* Marquee Track */}
        <div
          className={`marquee-track ${
            reduceMotion ? "flex overflow-x-auto scrollbar-none gap-8 px-6" : "animate-marquee-track"
          } flex flex-row items-start w-max gap-0 relative will-change-transform`}
        >
          {/* GROUP A */}
          <div className="marquee-group flex flex-row items-start gap-4 md:gap-6 lg:gap-8 flex-shrink-0 relative pr-4 md:pr-6 lg:pr-8">
            {WORK_ITEMS.map((item, index) => (
              <WorkCard key={`group-a-${index}`} item={item} />
            ))}
          </div>

          {/* GROUP B (Seamless Duplicate) */}
          {!reduceMotion && (
            <div className="marquee-group flex flex-row items-start gap-4 md:gap-6 lg:gap-8 flex-shrink-0 relative pr-4 md:pr-6 lg:pr-8" aria-hidden="true">
              {WORK_ITEMS.map((item, index) => (
                <WorkCard key={`group-b-${index}`} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>

    </section>
  );
}

interface WorkCardProps {
  item: (typeof WORK_ITEMS)[number];
}

function WorkCard({ item }: WorkCardProps) {
  const [error, setError] = useState(false);
  const filename = item.asset.split('/').pop();

  return (
    <div className="marquee-card relative block flex-shrink-0 w-[78vw] md:w-[240px] lg:w-[280px] top-auto bottom-auto left-auto right-auto transform-none m-0">
      {/* Image container */}
      <div
        className={`relative overflow-hidden rounded-[6px] bg-[color:var(--color-buzz-bg)] border border-[color:var(--color-buzz-line)]/50 ${item.aspect} w-full`}
      >
        {!error ? (
          <img
            src={item.asset}
            alt={item.title}
            loading="lazy"
            onError={() => setError(true)}
            className="h-full w-full object-cover block"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-4 bg-[#eceae1] text-center text-[color:var(--color-buzz-muted)]">
            <span className="text-[10px] font-mono tracking-wider break-all opacity-60">
              {filename}
            </span>
          </div>
        )}
      </div>

      {/* Metadata */}
      <div className="mt-[14px] flex flex-col justify-start text-left px-1">
        <div className="flex justify-between items-start whitespace-nowrap mb-[2px]">
          <span className="text-[14px] md:text-[15px] font-medium tracking-tight text-[color:var(--color-buzz-ink)]">
            {item.title}
          </span>
          <span className="text-[9px] tracking-[0.1em] text-[color:var(--color-buzz-muted)] font-mono uppercase mt-[3px]">
            {item.type}
          </span>
        </div>
        <span className="text-[10px] font-semibold tracking-[0.15em] text-[color:var(--color-buzz-muted)] uppercase">
          {item.label}
        </span>
      </div>
    </div>
  );
}
