/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { YellowButton } from "@/components/common/yellow-button";

export const NAV = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV.map((n) => n.id);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setOpen(false);
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      <motion.nav
        initial={false}
        animate={{
          width: scrolled ? "min(720px, 100%)" : "min(1240px, 100%)",
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={[
          "w-full max-w-[1240px] rounded-full transition-[background,box-shadow,border-color,backdrop-filter] duration-500",
          scrolled
            ? "border border-[color:var(--color-buzz-line)] bg-[color:var(--color-buzz-bg)]/70 shadow-[0_1px_0_rgba(17,17,17,0.04)] backdrop-blur-xl"
            : "border border-transparent bg-transparent",
        ].join(" ")}
      >
        <div className="relative flex items-center justify-between pl-[56px] pr-[56px] py-2.5">
          {/* Logo */}
          <button
            onClick={() => go("home")}
            className="group flex items-center justify-center cursor-pointer shrink-0 w-[85px] sm:w-[95px] lg:w-[105px] h-[40px] sm:h-[45px] lg:h-[50px] overflow-hidden relative mr-2 md:mr-6 lg:mr-10"
            aria-label="Buzzwork home"
          >
            {!logoFailed ? (
              <img
                src="/assets/logos/logo_header.png"
                alt="Buzzwork"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[155px] sm:w-[175px] lg:w-[195px] max-w-none h-auto object-contain"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <span className="font-display text-[24px] sm:text-[28px] font-semibold tracking-tight">
                Buzzwork
              </span>
            )}
          </button>

          {/* Desktop Navigation */}
          <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 md:flex">
            {NAV.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className="group relative rounded-full px-4 py-2 text-[13px] font-medium text-[color:var(--color-buzz-ink)]/70 transition-colors hover:text-[color:var(--color-buzz-ink)] cursor-pointer"
                >
                  {item.label}

                  <span
                    className={[
                      "absolute inset-x-4 -bottom-0.5 h-px origin-left bg-[color:var(--color-buzz-yellow)] transition-transform duration-500 ease-out",
                      active === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    ].join(" ")}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:block shrink-0">
            <YellowButton onClick={() => go("contact")}>Let's Talk</YellowButton>
          </div>

          {/* Mobile Menu */}
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-buzz-line)] md:hidden cursor-pointer"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
          >
            <span className="relative block h-3 w-4">
              <span
                className={[
                  "absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-300",
                  open ? "translate-y-1.5 rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-3 h-px w-4 bg-current transition-transform duration-300",
                  open ? "-translate-y-1.5 -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden md:hidden"
        >
          <ul className="flex flex-col gap-1 px-4 pb-4 pt-1">
            {NAV.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className="w-full rounded-2xl px-4 py-3 text-left font-display text-lg font-medium tracking-tight cursor-pointer"
                >
                  {item.label}
                </button>
              </li>
            ))}

            <li className="px-4 pt-2">
              <YellowButton full onClick={() => go("contact")}>
                Let's Talk
              </YellowButton>
            </li>
          </ul>
        </motion.div>
      </motion.nav>
    </div>
  );
}
