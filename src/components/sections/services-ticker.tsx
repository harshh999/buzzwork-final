import { useEffect, useState, Fragment } from "react";

const SERVICES_LIST = [
  "SOCIAL MEDIA",
  "CONTENT CREATION",
  "VIDEO PRODUCTION",
  "PERFORMANCE MARKETING",
  "BRANDING & IDENTITY",
  "INFLUENCER MARKETING",
  "WEB DESIGN",
  "ANALYTICS & REPORTING",
];

export function ServicesTicker() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return (
    <section className="relative w-full border-y border-black/10 h-[72px] md:h-[90px] lg:h-[110px] overflow-hidden flex items-center">
      <div className="w-full overflow-hidden relative">
        <div
          className={`${
            reduceMotion ? "flex overflow-x-auto scrollbar-none gap-7 md:gap-9 lg:gap-12 px-6" : "animate-marquee-ticker"
          } flex flex-row items-center gap-0 w-max relative will-change-transform`}
        >
          {/* GROUP A */}
          <div className="marquee-group flex flex-row items-center gap-7 md:gap-9 lg:gap-12 pr-7 md:pr-9 lg:pr-12 flex-shrink-0">
            {SERVICES_LIST.map((service, index) => (
              <Fragment key={`group-a-${index}`}>
                <span className="font-display uppercase font-semibold text-[22px] md:text-[27px] lg:text-[32px] tracking-[-0.02em] text-[color:var(--color-buzz-ink)]">
                  {service}
                </span>
                <span className="text-[color:var(--color-buzz-yellow)] font-semibold text-[28px] leading-none select-none">
                  •
                </span>
              </Fragment>
            ))}
          </div>

          {/* GROUP B (Seamless Loop duplicate) */}
          {!reduceMotion && (
            <div className="marquee-group flex flex-row items-center gap-7 md:gap-9 lg:gap-12 pr-7 md:pr-9 lg:pr-12 flex-shrink-0" aria-hidden="true">
              {SERVICES_LIST.map((service, index) => (
                <Fragment key={`group-b-${index}`}>
                  <span className="font-display uppercase font-semibold text-[22px] md:text-[27px] lg:text-[32px] tracking-[-0.02em] text-[color:var(--color-buzz-ink)]">
                    {service}
                  </span>
                  <span className="text-[color:var(--color-buzz-yellow)] font-semibold text-[28px] leading-none select-none">
                    •
                  </span>
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
