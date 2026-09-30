import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useNavigate, useLocation } from "@tanstack/react-router";

/* ─── Navigation Groups ─── */
const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

const SOCIAL_ITEMS = [
  { label: "Instagram", url: "https://www.instagram.com/buzzworkkk_/" },
  { label: "LinkedIn", url: "https://www.linkedin.com/company/buzzworkkk/" },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

function useReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const reduced = useReducedMotion();

  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-40px" });

  const handleNav = (id: string) => {
    if (id === "contact") {
      if (location.pathname === "/contact") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate({ to: "/contact" });
      }
      return;
    }

    if (id === "home") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate({ to: "/" });
      }
      return;
    }

    if (location.pathname !== "/") {
      navigate({ to: "/" }).then(() => {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
      });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleStartProject = () => {
    if (location.pathname === "/contact") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate({ to: "/contact" });
    }
  };

  return (
    <footer
      ref={containerRef}
      aria-label="Site footer"
      className="relative bg-[#050505] text-[#F5F5F0] overflow-hidden selection:bg-[#FFD400] selection:text-[#050505]"
    >

      {/* ── Substantially widened content container (approx 90-92vw, max 1440px, 40-60px side padding on desktop) ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-14">
        {/* ── 1. Main Content Row: Headline (left) & Supporting Copy + CTA (right) ── */}
        <div className="pt-12 sm:pt-14 lg:pt-16 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-14">
          {/* Left Column: Headline */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            className="w-full lg:max-w-[660px] xl:max-w-[720px] shrink-0"
          >
            <h2 className="font-display font-extrabold uppercase text-[clamp(2.15rem,4.4vw,3.75rem)] leading-[0.93] tracking-[-0.03em] text-[#F5F5F0]">
              <span className="block">MAKE SOME NOISE.</span>
              <span className="block mt-[0.06em]">
                MAKE IT <span className="text-[#FFD400]">MATTER.</span>
              </span>
            </h2>
          </motion.div>

          {/* Right Column: Supporting Copy & CTA (brought closer inward to participate in composition) */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
            className="w-full lg:max-w-[290px] flex flex-col items-start lg:pt-1"
          >
            <p className="text-[13px] sm:text-[14px] leading-[1.5] text-white/55 font-normal">
              Creative marketing, content, campaigns and production for brands that think bigger.
            </p>

            <div className="mt-4 sm:mt-5">
              <button
                id="footer-cta-start-project"
                onClick={handleStartProject}
                className="group inline-flex items-center gap-2 px-[18px] py-[9px] rounded-full border border-white/50 bg-transparent text-[13px] sm:text-[14px] font-medium text-white transition-all duration-300 hover:bg-[#FFD400] hover:text-[#050505] hover:border-[#FFD400] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFD400]"
              >
                <span>Start a Project</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── 2. Subtle Horizontal Divider ── */}
        <div className="mt-10 sm:mt-12 lg:mt-14 border-t border-white/[0.14] w-full" />

        {/* ── 3. Compact Utility Navigation Row ── */}
        <div className="pt-6 sm:pt-7 lg:pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-14 max-w-[880px]">
            {/* NAVIGATE */}
            <div>
              <span className="block text-[9px] sm:text-[10px] font-mono tracking-[0.16em] uppercase text-white/40 mb-2.5 select-none">
                NAVIGATE
              </span>
              <ul className="flex flex-col gap-1.5">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button
                      id={`footer-nav-${item.id}`}
                      onClick={() => handleNav(item.id)}
                      className="text-[13px] text-white/75 hover:text-white transition-colors duration-200 cursor-pointer text-left focus-visible:outline-none focus-visible:text-white"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* FOLLOW */}
            <div>
              <span className="block text-[9px] sm:text-[10px] font-mono tracking-[0.16em] uppercase text-white/40 mb-2.5 select-none">
                FOLLOW
              </span>
              <ul className="flex flex-col gap-1.5">
                {SOCIAL_ITEMS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] text-white/75 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* GET IN TOUCH */}
            <div>
              <span className="block text-[9px] sm:text-[10px] font-mono tracking-[0.16em] uppercase text-white/40 mb-2.5 select-none">
                GET IN TOUCH
              </span>
              <a
                href="mailto:buzzworkkk@gmail.com"
                className="text-[13px] text-white/75 hover:text-white transition-colors duration-200 break-all focus-visible:outline-none focus-visible:text-white"
              >
                buzzworkkk@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* ── 4. Small Buzzwork Logo (tight, natural placement) ── */}
        <div className="mt-8 sm:mt-10">
          <img
            id="footer-buzzwork-logo"
            src="/assets/logos/buzzwork_logo.png"
            alt="Buzzwork"
            width={85}
            height={41}
            className="w-[75px] sm:w-[85px] h-auto object-contain select-none opacity-85 transition-opacity duration-200 hover:opacity-100"
            draggable={false}
          />
        </div>

        {/* ── 5. Bottom Metadata Row (tight vertical padding, arrives shortly after logo) ── */}
        <div className="mt-6 sm:mt-7 pb-6 sm:pb-8 border-t border-white/[0.08] pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[9px] sm:text-[10px] font-mono tracking-[0.12em] uppercase text-white/40 select-none">
          <span>© 2026 BUZZWORK.</span>
          <span>AHMEDABAD, INDIA.</span>
        </div>
      </div>
    </footer>
  );
}
