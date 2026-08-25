import { useEffect, useState, Fragment } from "react";

const STRIP_ITEMS = [
  "PERFORMANCE MARKETING",
  "BRANDING & IDENTITY",
  "CONTENT & CREATIVE",
  "SOCIAL MEDIA"
];

export function AnimatedServicesStrip() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return (
    <section className="relative w-full border-t border-[color:var(--color-buzz-line)] h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px] overflow-hidden flex items-center bg-[color:var(--color-buzz-bg)]">
      <div className="w-full overflow-hidden relative">
        <div
          className={`${
            reduceMotion 
              ? "flex overflow-x-auto scrollbar-none gap-8 md:gap-12 lg:gap-16 px-6" 
              : "animate-marquee-ticker hover:[animation-play-state:paused]"
          } flex flex-row items-center gap-0 w-max relative will-change-transform`}
        >
          {/* GROUP A */}
          <div className="marquee-group flex flex-row items-center gap-8 md:gap-12 lg:gap-16 pr-8 md:pr-12 lg:pr-16 flex-shrink-0">
            {STRIP_ITEMS.map((item, index) => (
              <Fragment key={`group-a-${index}`}>
                <span className="font-sans uppercase font-bold text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] tracking-[-0.02em] text-[color:var(--color-buzz-ink)] whitespace-nowrap leading-none">
                  {item}
                </span>
                <span className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full bg-[color:var(--color-buzz-yellow)] flex-shrink-0" />
              </Fragment>
            ))}
          </div>

          {/* GROUP B (Seamless Loop duplicate) */}
          {!reduceMotion && (
            <div className="marquee-group flex flex-row items-center gap-8 md:gap-12 lg:gap-16 pr-8 md:pr-12 lg:pr-16 flex-shrink-0" aria-hidden="true">
              {STRIP_ITEMS.map((item, index) => (
                <Fragment key={`group-b-${index}`}>
                  <span className="font-sans uppercase font-bold text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] tracking-[-0.02em] text-[color:var(--color-buzz-ink)] whitespace-nowrap leading-none">
                    {item}
                  </span>
                  <span className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full bg-[color:var(--color-buzz-yellow)] flex-shrink-0" />
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
