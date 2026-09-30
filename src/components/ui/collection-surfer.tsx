"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  MotionValue,
} from "motion/react";

export interface CollectionItem {
  id: number;
  image?: string;
  video?: string;
  title: string;
  category?: string;
  number?: string;
}

export type CollectionSurferVariant = "magnetic" | "uplift" | "simple";

// Default items for the component in case none are provided
const ITEMS: CollectionItem[] = [
  {
    id: 1,
    video: "https://res.cloudinary.com/diqslwugu/video/upload/showcase2re_umvk8w.mp4",
    title: "SOCIAL CONTENT",
    category: "CONTENT",
    number: "01",
  },
  {
    id: 2,
    video: "https://res.cloudinary.com/diqslwugu/video/upload/showcase6re_zqxcho.mp4",
    title: "BRAND CAMPAIGN",
    category: "CAMPAIGN",
    number: "02",
  },
  {
    id: 3,
    video: "https://res.cloudinary.com/diqslwugu/video/upload/v1790669709/showcase4re2_ksqwcv.mp4",
    title: "CREATIVE PRODUCTION",
    category: "PRODUCTION",
    number: "03",
  },
  {
    id: 4,
    video: "https://res.cloudinary.com/diqslwugu/video/upload/v1790669707/showcase3re_w9ctlh.mp4",
    title: "SOCIAL MEDIA",
    category: "SOCIAL",
    number: "04",
  },
  {
    id: 5,
    video: "https://res.cloudinary.com/diqslwugu/video/upload/v1790669689/showcase1re_kuk2ds.mp4",
    title: "VIDEO PRODUCTION",
    category: "VIDEO",
    number: "05",
  },
  {
    id: 6,
    video: "https://res.cloudinary.com/diqslwugu/video/upload/v1790669674/showcase5re_rqqcvw.mp4",
    title: "CONTENT CAMPAIGN",
    category: "CAMPAIGN",
    number: "06",
  },
];

interface CollectionSurferProps {
  items?: CollectionItem[];
  variant?: CollectionSurferVariant;
  className?: string;
  showOverlayText?: boolean;
}

export function CollectionSurfer({
  items = ITEMS,
  variant = "magnetic",
  className = "",
  showOverlayText = false,
}: CollectionSurferProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Loop Setup: Duplicate items to create a buffer
  const duplicatedItems = [...items, ...items, ...items];

  // Scroll sensitivity
  const scrollPerItem = 450;

  // The exact scroll distance to complete one full loop of the ORIGINAL items
  const loopDistance = items.length * scrollPerItem;

  const { scrollY } = useScroll();

  const smoothScroll = useSpring(scrollY, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
  });

  // 2. Modulo Logic:
  const loopedProgress = useTransform(
    smoothScroll,
    (value) => value % loopDistance,
  );

  // Step vector in 3D space
  const stepX = 260;
  const stepY = -70;
  const stepZ = -280;

  // Move scene backwards by length of set
  const x = useTransform(
    loopedProgress,
    [0, loopDistance],
    [0, -items.length * stepX],
  );
  const y = useTransform(
    loopedProgress,
    [0, loopDistance],
    [0, -items.length * stepY],
  );
  const z = useTransform(
    loopedProgress,
    [0, loopDistance],
    [0, -items.length * stepZ],
  );

  // Mouse position for magnetic effect
  const mouseX = useMotionValue(-10000);
  const mouseY = useMotionValue(-10000);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (variant === "simple") return;
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseLeave = () => {
    if (variant === "simple") return;
    mouseX.set(-10000);
    mouseY.set(-10000);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* UI Overlays (Optional) */}
      {showOverlayText && (
        <div className="absolute top-6 left-6 z-50 pointer-events-none mix-blend-difference text-white">
          <h1 className="font-heading font-bold text-[clamp(1.75rem,4vw,3.5rem)] leading-[0.9] tracking-tighter">
            SELECTED WORK
            <span className="text-[0.4em] align-top relative top-[0.6em] ml-2 font-mono tabular-nums opacity-70">
              ({items.length})
            </span>
          </h1>
        </div>
      )}

      {/* 3D Scene Container */}
      <div
        className="relative w-full h-[600px] sm:h-[680px] lg:h-[760px] flex items-center justify-center"
        style={{
          perspective: "2000px",
          perspectiveOrigin: "15% 35%",
        }}
      >
        {/* Animated Track */}
        <motion.div
          className="relative w-0 h-0"
          style={{
            x,
            y,
            z,
            transformStyle: "preserve-3d",
          }}
        >
          {duplicatedItems.map((item, i) => (
            <Card
              key={`${item.id}-${i}`}
              item={item}
              i={i}
              totalOriginal={items.length}
              stepX={stepX}
              stepY={stepY}
              stepZ={stepZ}
              mouseX={mouseX}
              mouseY={mouseY}
              scrollSpring={smoothScroll}
              variant={variant}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Card({
  item,
  i,
  totalOriginal,
  stepX,
  stepY,
  stepZ,
  mouseX,
  mouseY,
  scrollSpring,
  variant,
}: {
  item: CollectionItem;
  i: number;
  totalOriginal: number;
  stepX: number;
  stepY: number;
  stepZ: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollSpring: MotionValue<number>;
  variant: CollectionSurferVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Calculate distance from mouse to center of card
  const distance = useTransform([mouseX, mouseY, scrollSpring], ([xVal, yVal]: number[]) => {
    if (!ref.current || variant === "simple") return 400;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.sqrt(Math.pow((xVal ?? 0) - centerX, 2) + Math.pow((yVal ?? 0) - centerY, 2));
  });

  // Magnetic Variant Scale
  const targetScale = useTransform(distance, [0, 350], [1.35, 1]);
  const springScale = useSpring(targetScale, {
    mass: 0.4,
    stiffness: 280,
    damping: 22,
  });

  // Uplift Variant Y Translation
  const targetUplift = useTransform(distance, [0, 350], [-80, 0]);
  const springUplift = useSpring(targetUplift, {
    mass: 0.4,
    stiffness: 280,
    damping: 22,
  });

  // Combine transforms
  const transform = useTransform([springScale, springUplift], ([s, u]) => {
    let scaleValue = 1;
    let upliftValue = 0;

    if (variant === "magnetic") {
      scaleValue = Number(s);
    } else if (variant === "uplift") {
      upliftValue = Number(u);
    }

    const baseX = i * stepX;
    const baseY = i * stepY;
    const baseZ = i * stepZ;

    return `translate3d(${baseX}px, ${baseY + upliftValue}px, ${baseZ}px) rotateY(-45deg) scale(${scaleValue})`;
  });

  // Autoplay video when card is visible
  useEffect(() => {
    const videoEl = videoRef.current;
    const cardEl = ref.current;
    if (!videoEl || !cardEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            const promise = videoEl.play();
            if (promise !== undefined) {
              promise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
            }
          } else {
            videoEl.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: [0, 0.3, 1.0] }
    );

    observer.observe(cardEl);
    return () => observer.disconnect();
  }, []);

  const displayIndex = String((i % totalOriginal) + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      className="absolute w-[280px] sm:w-[320px] h-[360px] sm:h-[420px] bg-[#EAE8E2] rounded-[6px] overflow-hidden border border-[color:var(--color-buzz-line)]/80 shadow-2xl transition-colors duration-500 ease-out group"
      style={{
        transform,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Index Number Badge */}
      <div className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded bg-[#111111]/70 backdrop-blur-md text-white font-mono text-[10px] tracking-wider uppercase opacity-80 group-hover:opacity-100 transition-opacity">
        {displayIndex}
      </div>

      {/* Media: Video or Image */}
      <div className="relative w-full h-full overflow-hidden">
        {item.video ? (
          <video
            ref={videoRef}
            src={item.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label={`${item.title} video`}
            className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>

      {/* Bottom Minimal Metadata Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white flex items-center justify-between text-[11px] uppercase tracking-wider font-mono">
        <span className="font-medium truncate max-w-[70%]">{item.title}</span>
        <span className="opacity-70 text-[10px]">{item.category}</span>
      </div>
    </motion.div>
  );
}

export default CollectionSurfer;
