import { useRef } from "react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";

interface GalleryCardData {
  id: string;
  image: string;
  title: string;
  aspect: string;
  visibility: string;
  vars: Record<string, string>;
}

const GALLERY_CARDS: GalleryCardData[] = [
  {
    id: "c1",
    image: "/images/hero/digital_collage_1787636452496.jpg",
    title: "Digital Collage",
    aspect: "aspect-[4/3]",
    visibility: "hidden lg:block", // Desktop only
    vars: {
      "--x-lg": "-470px",
      "--y-lg": "0px",
      "--r-lg": "-8deg",
      "--z-lg": "2",
    },
  },
  {
    id: "c2",
    image: "/images/hero/colorful_abstract_1787636259114.jpg",
    title: "Abstract",
    aspect: "aspect-[4/3]",
    visibility: "hidden sm:block", // Tablet and desktop
    vars: {
      "--x-md": "-230px",
      "--y-md": "-10px",
      "--r-md": "-6deg",
      "--z-md": "3",
      
      "--x-lg": "-330px",
      "--y-lg": "-15px",
      "--r-lg": "-6deg",
      "--z-lg": "3",
    },
  },
  {
    id: "c3",
    image: "/images/hero/editorial_graphic_1787636215088.jpg",
    title: "Editorial",
    aspect: "aspect-[4/3]",
    visibility: "block", // All screens
    vars: {
      "--x-xs": "-55px",
      "--y-xs": "0px",
      "--r-xs": "-3deg",
      "--z-xs": "20",
      
      "--x-md": "-120px",
      "--y-md": "-25px",
      "--r-md": "-3deg",
      "--z-md": "4",
      
      "--x-lg": "-170px",
      "--y-lg": "-35px",
      "--r-lg": "-3deg",
      "--z-lg": "4",
    },
  },
  {
    id: "c4",
    image: "/images/hero/surreal_3d_1787636247073.jpg",
    title: "Surreal 3D",
    aspect: "aspect-[4/3]",
    visibility: "block", // All screens - Center card
    vars: {
      "--x-xs": "0px",
      "--y-xs": "-10px",
      "--r-xs": "0deg",
      "--z-xs": "30",
      
      "--x-md": "0px",
      "--y-md": "-40px",
      "--r-md": "0deg",
      "--z-md": "5",
      
      "--x-lg": "0px",
      "--y-lg": "-55px",
      "--r-lg": "0deg",
      "--z-lg": "5",
    },
  },
  {
    id: "c5",
    image: "/images/hero/creative_ad_1787636272395.jpg",
    title: "Creative Ad",
    aspect: "aspect-[4/3]",
    visibility: "block", // All screens
    vars: {
      "--x-xs": "55px",
      "--y-xs": "0px",
      "--r-xs": "3deg",
      "--z-xs": "20",
      
      "--x-md": "120px",
      "--y-md": "-25px",
      "--r-md": "3deg",
      "--z-md": "4",
      
      "--x-lg": "170px",
      "--y-lg": "-35px",
      "--r-lg": "3deg",
      "--z-lg": "4",
    },
  },
  {
    id: "c6",
    image: "/images/hero/experimental_type_1787636232707.jpg",
    title: "Typography",
    aspect: "aspect-[4/3]",
    visibility: "hidden sm:block", // Tablet and desktop
    vars: {
      "--x-md": "230px",
      "--y-md": "-10px",
      "--r-md": "6deg",
      "--z-md": "3",
      
      "--x-lg": "330px",
      "--y-lg": "-15px",
      "--r-lg": "6deg",
      "--z-lg": "3",
    },
  },
  {
    id: "c7",
    image: "/images/hero/ai_experimental_1787636463536.jpg",
    title: "AI Art",
    aspect: "aspect-[4/3]",
    visibility: "hidden lg:block", // Desktop only
    vars: {
      "--x-lg": "470px",
      "--y-lg": "0px",
      "--r-lg": "8deg",
      "--z-lg": "2",
    },
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (typeof window !== "undefined") {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#f5f4f1] pt-[84px] pb-10 px-[18px] md:pt-[120px] md:pb-20 md:px-0 lg:pt-[152px] lg:pb-24 flex flex-col items-center"
    >
      {/* Mobile-Only Hero Redesign (< 768px) */}
      <div className="md:hidden w-full flex flex-col items-center">
        {/* Centered Editorial Header Content */}
        <div className="w-full text-center flex flex-col items-center max-w-[370px]">
          {/* Large Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="w-full font-display font-medium text-[#111111] tracking-[-0.04em] text-[clamp(42px,10vw,54px)] leading-[1.0]"
          >
            We create work people{" "}
            <span className="relative inline-block font-serif italic font-normal text-[color:var(--color-buzz-yellow)]">
              remember.
            </span>
          </motion.h1>

          {/* Subheadline Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
            className="mt-5 w-full max-w-[350px] text-[16px] leading-[1.5] text-[#555555] font-sans"
          >
            We turn ambitious ideas into bold creative that gets noticed, remembered, and talked about.
          </motion.p>

          {/* Vertically Stacked Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            className="mt-7 flex flex-col gap-3 w-full"
          >
            {/* Primary Action Button */}
            <Link
              to="/contact"
              className="inline-flex w-full h-[54px] items-center justify-center gap-2 rounded-full bg-[#111111] text-[15px] font-medium text-white shadow-sm transition-all duration-300 hover:bg-black cursor-pointer"
            >
              <span>Start a Project</span>
              <span aria-hidden="true">→</span>
            </Link>

            {/* Secondary Action Button */}
            <button
              onClick={() => scrollToSection("work")}
              className="inline-flex w-full h-[54px] items-center justify-center gap-1.5 rounded-full bg-white border border-black/10 text-[15px] font-medium text-[#111111] shadow-sm transition-all duration-300 hover:bg-black/5 cursor-pointer"
            >
              <span>Explore Our Work</span>
              <span aria-hidden="true" className="inline-block">↓</span>
            </button>
          </motion.div>
        </div>

        {/* Mobile Artwork Showcase - 3 Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          className="relative mt-11 w-full h-[250px] flex items-end justify-center select-none overflow-visible"
        >
          {/* Left Card: Editorial (idx 2 equivalent) */}
          <div
            className="absolute left-1/2 bottom-0 w-[140px] h-[160px] rounded-[14px] overflow-hidden bg-white border border-black/[0.04] shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-transform duration-500 hover:scale-105"
            style={{
              zIndex: 1,
              transform: "translateX(calc(-50% - 65px)) rotate(-6deg)",
            }}
          >
            <img
              src="/images/hero/editorial_graphic_1787636215088.jpg"
              alt="Editorial"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Center Card: Surreal 3D Crystal (idx 3 equivalent) */}
          <div
            className="absolute left-1/2 bottom-3 w-[190px] h-[190px] rounded-[18px] overflow-hidden bg-white border border-black/[0.06] shadow-[0_15px_35px_rgba(0,0,0,0.12)] z-10 -translate-x-1/2 transition-transform duration-500 hover:scale-105"
          >
            <img
              src="/images/hero/surreal_3d_1787636247073.jpg"
              alt="Surreal 3D"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>

          {/* Right Card: Creative Ad (idx 4 equivalent) */}
          <div
            className="absolute left-1/2 bottom-0 w-[140px] h-[160px] rounded-[14px] overflow-hidden bg-white border border-black/[0.04] shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-transform duration-500 hover:scale-105"
            style={{
              zIndex: 1,
              transform: "translateX(calc(-50% + 65px)) rotate(6deg)",
            }}
          >
            <img
              src="/images/hero/creative_ad_1787636272395.jpg"
              alt="Creative Ad"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>

      {/* Desktop/Tablet Hero Layout (>= 768px) */}
      <div className="hidden md:flex w-full max-w-[1340px] px-4 sm:px-6 lg:px-10 flex-col items-center">
        {/* Centered Editorial Header Content */}
        <div className="w-full text-center flex flex-col items-center max-w-[1000px] mx-auto">
          {/* Large Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="w-full font-display font-medium text-[#111111] tracking-[-0.04em] text-[clamp(38px,6.5vw,84px)] leading-[0.96] sm:leading-[0.94]"
          >
            We create work people{" "}
            <span className="relative inline-block font-serif italic font-normal text-[color:var(--color-buzz-yellow)]">
              remember.
            </span>
          </motion.h1>

          {/* Subheadline Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
            className="mt-7 sm:mt-8 w-full max-w-[560px] text-[15px] sm:text-[17px] leading-[1.6] text-[#555555] font-sans"
          >
            We turn ambitious ideas into bold creative that gets noticed, remembered, and talked about.
          </motion.p>

          {/* Side-by-Side Action Pill Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-5 w-full sm:w-auto"
          >
            {/* Primary Action Button */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] px-8 py-3.5 text-[14px] sm:text-[15px] font-medium text-white shadow-sm transition-all duration-300 hover:bg-black hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Start a Project</span>
              <span aria-hidden="true">→</span>
            </Link>

            {/* Secondary Action Button */}
            <button
              onClick={() => scrollToSection("work")}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white border border-black/10 px-8 py-3.5 text-[14px] sm:text-[15px] font-medium text-[#111111] shadow-sm transition-all duration-300 hover:bg-black/5 hover:border-black/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
            >
              <span>Explore Our Work</span>
              <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </button>
          </motion.div>
        </div>

        {/* Premium Layered Gallery Composition - Wide Horizontal Editorial Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="relative mt-20 sm:mt-24 lg:mt-[100px] w-[82vw] max-w-[1200px] h-[210px] sm:h-[280px] lg:h-[340px] flex items-end justify-center select-none overflow-visible"
        >
          {GALLERY_CARDS.map((card, idx) => {
            // Determine card sizes responsively for wide landscape editorial showcase
            let cardSizeClass = "";
            let shadowClass = "";
            
            if (idx === 3) {
              // Center card: dominant landscape 340x265px
              cardSizeClass = "w-[240px] lg:w-[340px] h-[180px] lg:h-[265px]";
              shadowClass = "shadow-[0_20px_50px_rgba(0,0,0,0.12)] border-black/[0.06]";
            } else if (idx === 2 || idx === 4) {
              // Inner cards: landscape 280x210px
              cardSizeClass = "w-[200px] lg:w-[280px] h-[150px] lg:h-[210px]";
              shadowClass = "shadow-[0_12px_35px_rgba(0,0,0,0.07)] border-black/[0.04]";
            } else if (idx === 1 || idx === 5) {
              // Middle cards: landscape 230x175px
              cardSizeClass = "w-[170px] lg:w-[230px] h-[130px] lg:h-[175px]";
              shadowClass = "shadow-[0_8px_30px_rgba(0,0,0,0.05)] border-black/[0.03]";
            } else {
              // Outermost cards: landscape 190x145px
              cardSizeClass = "w-[140px] lg:w-[190px] h-[110px] lg:h-[145px]";
              shadowClass = "shadow-[0_6px_25px_rgba(0,0,0,0.04)] border-black/[0.03]";
            }
            
            return (
              <div
                key={card.id}
                className={`gallery-card absolute left-1/2 bottom-0 origin-bottom transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:!z-50 hover:scale-105 hover:-translate-y-4 rounded-[16px] sm:rounded-[24px] overflow-hidden bg-white border ${cardSizeClass} ${card.visibility} ${shadowClass}`}
                style={card.vars as React.CSSProperties}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover"
                  loading={idx === 3 ? "eager" : "lazy"}
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}






