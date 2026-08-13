/* eslint-disable react-refresh/only-export-components */
import { useRef, useState, useEffect, Fragment } from "react";
import { motion, useInView } from "motion/react";
import { SectionLabel } from "@/components/common/section-label";

export const SERVICES = [
  {
    n: "01",
    title: "Social Media Management",
    body: "Consistent, on-brand presence across every channel — planned, produced, and published with intent.",
  },
  {
    n: "02",
    title: "Content Creation",
    body: "Editorial-grade content built to earn attention and stand up to scrutiny.",
  },
  {
    n: "03",
    title: "Video Production",
    body: "From concept to final grade — story-first video for brand, product, and performance.",
  },
  {
    n: "04",
    title: "Performance Marketing",
    body: "Paid media engineered around measurable outcomes, not vanity metrics.",
  },
  {
    n: "05",
    title: "Branding & Identity",
    body: "Positioning, naming, and identity systems that hold up across every touchpoint.",
  },
  {
    n: "06",
    title: "Influencer Marketing",
    body: "Curated partnerships with creators whose audiences actually match your brand.",
  },
  {
    n: "07",
    title: "Web Design & Development",
    body: "Considered, fast, accessible websites that convert as well as they look.",
  },
  {
    n: "08",
    title: "Analytics & Reporting",
    body: "Clear reporting and honest analysis — so every decision is grounded in evidence.",
  },
];

export function Services() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-80px" });

  const listRef = useRef<HTMLDivElement>(null);
  const isListInView = useInView(listRef, { once: true, margin: "-100px" });

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRowClick = (index: number) => {
    if (isMobile) {
      setExpandedIndex(expandedIndex === index ? null : index);
    }
  };

  return (
    <section id="services" className="relative py-32 sm:py-40">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        {/* Editorial Section Heading */}
        <div ref={headingRef} className="grid gap-10 lg:grid-cols-12 lg:items-end mb-24">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.22em] text-[color:var(--color-buzz-muted)]">
              SERVICES
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.03em] flex flex-col">
              <span className="block overflow-hidden pb-1.5">
                <motion.span
                  className="block origin-bottom"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={isHeadingInView ? { y: "0%", opacity: 1 } : {}}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  Everything your brand
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1.5 text-[color:var(--color-buzz-muted)]">
                <motion.span
                  className="block origin-bottom"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={isHeadingInView ? { y: "0%", opacity: 1 } : {}}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
                >
                  needs to stay relevant.
                </motion.span>
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
              className="max-w-md text-[16px] leading-relaxed text-[color:var(--color-buzz-muted)] lg:ml-auto"
            >
              Eight disciplines, one team. We plug in where it matters and stay out of the way where
              it doesn't.
            </motion.p>
          </div>
        </div>

        {/* Editorial Services List */}
        <div ref={listRef} className="w-full max-w-[1400px] mx-auto border-t border-black/12 flex flex-col">
          {SERVICES.map((s, i) => (
            <ServiceRow
              key={s.n}
              service={s}
              index={i}
              isListInView={isListInView}
              isExpanded={expandedIndex === i}
              isMobile={isMobile}
              onRowClick={handleRowClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceRowProps {
  service: (typeof SERVICES)[number];
  index: number;
  isListInView: boolean;
  isExpanded: boolean;
  isMobile: boolean;
  onRowClick: (idx: number) => void;
}

function ServiceRow({ service, index, isListInView, isExpanded, isMobile, onRowClick }: ServiceRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={isListInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.05,
      }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={() => onRowClick(index)}
      className="grid grid-cols-[50px_1fr_40px] md:grid-cols-[80px_1fr_60px] items-center border-b border-black/12 py-6 md:py-8 lg:py-10 transition-all duration-300 relative overflow-hidden cursor-pointer w-full text-left"
    >
      {/* 1. Number Indicator */}
      <span className="text-[12px] font-normal tracking-[0.18em] text-black/45 align-middle select-none">
        {service.n}
      </span>

      {/* 2. Main Content Area */}
      <div className="flex flex-col w-full pr-4 md:pr-8">
        <div className="flex flex-row items-center justify-between w-full">
          {/* Title */}
          <motion.h3
            animate={{ x: isHovered && !isMobile ? 12 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="font-display text-[26px] md:text-[36px] lg:text-[44px] font-medium tracking-[-0.03em] text-black"
          >
            {service.title}
          </motion.h3>

          {/* Desktop Visual Preview Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: isHovered && !isMobile ? 1 : 0,
              scale: isHovered && !isMobile ? 1 : 0.95,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="hidden md:block w-[140px] h-[80px] lg:w-[160px] lg:h-[90px] rounded-[4px] border border-black/10 overflow-hidden bg-[color:var(--color-buzz-bg)] mr-4 lg:mr-8 flex-shrink-0 relative"
          >
            <ServiceGraphic num={service.n} active={isHovered} />
          </motion.div>
        </div>

        {/* Desktop Description */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isHovered && !isMobile ? "auto" : 0, opacity: isHovered && !isMobile ? 0.6 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="overflow-hidden hidden md:block"
        >
          <p className="text-black text-[14.5px] mt-2 max-w-xl leading-relaxed">
            {service.body}
          </p>
        </motion.div>

        {/* Mobile Description & Preview Accordion */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isExpanded && isMobile ? "auto" : 0, opacity: isExpanded && isMobile ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="overflow-hidden md:hidden"
        >
          <p className="text-black/60 text-[14px] mt-2 leading-relaxed">
            {service.body}
          </p>
          <div className="w-full h-[120px] rounded-[4px] border border-black/10 overflow-hidden bg-[color:var(--color-buzz-bg)] mt-4 mb-2 relative">
            <ServiceGraphic num={service.n} active={isExpanded} />
          </div>
        </motion.div>
      </div>

      {/* 3. Arrow Indicator */}
      <motion.div
        animate={
          isHovered && !isMobile
            ? { x: 4, y: -4, color: "var(--color-buzz-yellow)" }
            : isExpanded && isMobile
            ? { color: "var(--color-buzz-yellow)" }
            : { x: 0, y: 0, color: "#111111" }
        }
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="text-[24px] md:text-[28px] font-normal flex justify-end select-none"
      >
        ↗
      </motion.div>

      {/* Desktop Yellow Underline Accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered && !isMobile ? 1 : 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[color:var(--color-buzz-yellow)] origin-left z-10"
      />
    </motion.div>
  );
}

/* Service Graphic Dispatcher */
function ServiceGraphic({ num, active }: { num: string; active: boolean }) {
  switch (num) {
    case "01":
      return <SocialMediaGraphic active={active} />;
    case "02":
      return <ContentCreationGraphic active={active} />;
    case "03":
      return <VideoProductionGraphic active={active} />;
    case "04":
      return <PerformanceMarketingGraphic active={active} />;
    case "05":
      return <BrandingIdentityGraphic active={active} />;
    case "06":
      return <InfluencerMarketingGraphic active={active} />;
    case "07":
      return <WebDesignGraphic active={active} />;
    case "08":
      return <AnalyticsReportingGraphic active={active} />;
    default:
      return null;
  }
}

/* 01 Social Media Management (Social Media Interface) */
function SocialMediaGraphic({ active }: { active: boolean }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="50" height="50" rx="4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
      <rect x="20" y="20" width="40" height="28" rx="2" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" fill="none" />
      <circle cx="27" cy="56" r="4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="35" y1="56" x2="55" y2="56" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <motion.circle
        cx="58"
        cy="22"
        r="4.5"
        fill="var(--color-buzz-yellow)"
        initial={{ scale: 0 }}
        animate={{ scale: active ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
      />
      <motion.path
        d="M 52,62 L 40,55 L 45,51 Z"
        fill="currentColor"
        initial={{ x: 10, y: 10, opacity: 0 }}
        animate={active ? { x: -6, y: -6, opacity: 1 } : { x: 10, y: 10, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </svg>
  );
}

/* 02 Content Creation (Editorial Layout Crop Marks) */
function ContentCreationGraphic({ active }: { active: boolean }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M 12,20 L 12,12 L 20,12"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.4"
        animate={active ? { x: 2, y: 2 } : { x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M 68,60 L 68,68 L 60,68"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.4"
        animate={active ? { x: -2, y: -2 } : { x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
      />
      <rect x="22" y="22" width="36" height="36" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" />
      <motion.line x1="28" y1="30" x2="52" y2="30" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" initial={{ scaleX: 0 }} animate={{ scaleX: active ? 1 : 0 }} className="origin-left" />
      <motion.line x1="28" y1="36" x2="48" y2="36" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" initial={{ scaleX: 0 }} animate={{ scaleX: active ? 1 : 0 }} transition={{ delay: 0.1 }} className="origin-left" />
      <motion.path
        d="M 27,45 L 53,45"
        stroke="var(--color-buzz-yellow)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.75"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: active ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.15 }}
      />
    </svg>
  );
}

/* 03 Video Production (Video Timeline) */
function VideoProductionGraphic({ active }: { active: boolean }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="25" width="50" height="30" rx="3" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
      <motion.line
        x1="20"
        y1="22"
        x2="20"
        y2="58"
        stroke="var(--color-buzz-yellow)"
        strokeWidth="1.5"
        animate={active ? { x: [0, 40, 0] } : { x: 0 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      />
      <motion.g stroke="currentColor" strokeWidth="1" strokeOpacity="0.5">
        <motion.line x1="25" y1="40" x2="25" y2={active ? 34 : 40} animate={active ? { y2: [34, 46, 34] } : {}} transition={{ repeat: Infinity, duration: 1.2 }} />
        <motion.line x1="32" y1="40" x2="32" y2={active ? 48 : 40} animate={active ? { y2: [48, 32, 48] } : {}} transition={{ repeat: Infinity, duration: 1.5 }} />
        <motion.line x1="39" y1="40" x2="39" y2={active ? 30 : 40} animate={active ? { y2: [30, 50, 30] } : {}} transition={{ repeat: Infinity, duration: 1 }} />
        <motion.line x1="46" y1="40" x2="46" y2={active ? 44 : 40} animate={active ? { y2: [44, 36, 44] } : {}} transition={{ repeat: Infinity, duration: 1.3 }} />
        <motion.line x1="53" y1="40" x2="53" y2={active ? 32 : 40} animate={active ? { y2: [32, 48, 32] } : {}} transition={{ repeat: Infinity, duration: 1.1 }} />
      </motion.g>
    </svg>
  );
}

/* 04 Performance Marketing (Growth Curve Graph) */
function PerformanceMarketingGraphic({ active }: { active: boolean }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="15" y1="65" x2="65" y2="65" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
      <line x1="15" y1="65" x2="15" y2="15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
      <motion.path
        d="M 15,60 C 25,58 35,42 45,35 C 55,28 60,18 65,15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: active ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.circle
        cx="45"
        cy="35"
        r="2.5"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: active ? 1 : 0 }}
        transition={{ delay: 0.6 }}
      />
      <motion.circle
        cx="65"
        cy="15"
        r="4.5"
        fill="var(--color-buzz-yellow)"
        initial={{ scale: 0 }}
        animate={active ? { scale: [1, 1.6, 1] } : { scale: 0 }}
        transition={{ repeat: Infinity, duration: 2, delay: 1 }}
      />
    </svg>
  );
}

/* 05 Branding & Identity (Logo Construction System) */
function BrandingIdentityGraphic({ active }: { active: boolean }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.15" />
      <line x1="40" y1="12" x2="40" y2="68" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.15" />
      <line x1="12" y1="40" x2="68" y2="40" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.15" />
      <motion.circle
        cx="40"
        cy="40"
        r="14"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ x: -12, opacity: 0 }}
        animate={active ? { x: 0, opacity: 1 } : { x: -12, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.rect
        x="26"
        y="26"
        width="28"
        height="28"
        stroke="var(--color-buzz-yellow)"
        strokeWidth="1.5"
        initial={{ x: 12, opacity: 0 }}
        animate={active ? { x: 0, opacity: 1 } : { x: 12, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      />
    </svg>
  );
}

/* 06 Influencer Marketing (Creator Connections) */
function InfluencerMarketingGraphic({ active }: { active: boolean }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.circle
        cx="40"
        cy="40"
        r="6"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: active ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
      <motion.circle cx="20" cy="25" r="4.5" stroke="currentColor" strokeWidth="1" initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0 }} transition={{ delay: 0.3 }} />
      <motion.circle cx="60" cy="30" r="4.5" stroke="currentColor" strokeWidth="1" initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0 }} transition={{ delay: 0.4 }} />
      <motion.circle cx="35" cy="60" r="4.5" stroke="currentColor" strokeWidth="1" initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0 }} transition={{ delay: 0.5 }} />
      <motion.line x1="40" y1="40" x2="20" y2="25" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.4" initial={{ pathLength: 0 }} animate={{ pathLength: active ? 1 : 0 }} transition={{ delay: 0.3 }} />
      <motion.line x1="40" y1="40" x2="60" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.4" initial={{ pathLength: 0 }} animate={{ pathLength: active ? 1 : 0 }} transition={{ delay: 0.4 }} />
      <motion.line x1="40" y1="40" x2="35" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.4" initial={{ pathLength: 0 }} animate={{ pathLength: active ? 1 : 0 }} transition={{ delay: 0.5 }} />
      <motion.circle
        cx="20"
        cy="25"
        r="2"
        fill="var(--color-buzz-yellow)"
        animate={active ? { scale: [1, 2, 1] } : { scale: 1 }}
        transition={{ repeat: Infinity, duration: 2.2, delay: 0.5 }}
      />
      <motion.circle
        cx="60"
        cy="30"
        r="2"
        fill="var(--color-buzz-yellow)"
        animate={active ? { scale: [1, 2, 1] } : { scale: 1 }}
        transition={{ repeat: Infinity, duration: 1.8, delay: 0.8 }}
      />
    </svg>
  );
}

/* 07 Website Design & Development (Browser Window layout) */
function WebDesignGraphic({ active }: { active: boolean }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="18" width="56" height="44" rx="3" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.3" />
      <circle cx="18" cy="24" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <circle cx="23" cy="24" r="1.5" fill="currentColor" fillOpacity="0.3" />
      <motion.rect
        x="18"
        y="30"
        width="44"
        height="12"
        rx="1.5"
        fill="currentColor"
        fillOpacity="0.08"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        className="origin-left"
        transition={{ duration: 0.5 }}
      />
      <motion.rect
        x="18"
        y="46"
        width="20"
        height="10"
        rx="1"
        fill="var(--color-buzz-yellow)"
        fillOpacity="0.8"
        initial={{ opacity: 0, y: 5 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />
      <motion.rect
        x="42"
        y="46"
        width="20"
        height="10"
        rx="1"
        fill="currentColor"
        fillOpacity="0.12"
        initial={{ opacity: 0, y: 5 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      />
    </svg>
  );
}

/* 08 Analytics & Reporting (Data Dashboard) */
function AnalyticsReportingGraphic({ active }: { active: boolean }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect
        x="20"
        y="52"
        width="8"
        height="12"
        fill="currentColor"
        fillOpacity="0.2"
        initial={{ height: 0, y: 64 }}
        animate={active ? { height: 20, y: 44 } : { height: 0, y: 64 }}
        transition={{ duration: 0.5 }}
      />
      <motion.rect
        x="32"
        y="52"
        width="8"
        height="24"
        fill="currentColor"
        fillOpacity="0.2"
        initial={{ height: 0, y: 64 }}
        animate={active ? { height: 32, y: 32 } : { height: 0, y: 64 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      <motion.rect
        x="44"
        y="52"
        width="8"
        height="36"
        fill="var(--color-buzz-yellow)"
        initial={{ height: 0, y: 64 }}
        animate={active ? { height: 44, y: 20 } : { height: 0, y: 64 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.path
        d="M 24,48 L 36,36 L 48,22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: active ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </svg>
  );
}
