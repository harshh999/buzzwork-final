"use client";

import React, { useEffect, useRef, useState } from "react";

export interface CircularVideoItem {
  id: string;
  url: string;
  label: string;
  index: string;
  category?: string;
  title?: string;
}

export interface CircularVideoGalleryProps {
  items: CircularVideoItem[];
  sectionRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

export function CircularVideoGallery({
  items,
  sectionRef,
  className = "",
}: CircularVideoGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const videosRef = useRef<(HTMLVideoElement | null)[]>([]);

  const [reduceMotion, setReduceMotion] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  const rotationAngleRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isInViewRef = useRef(true);
  const reduceMotionRef = useRef(false);

  // Responsive dimensions calculation
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const initialReduce = motionQuery.matches;
    setReduceMotion(initialReduce);
    reduceMotionRef.current = initialReduce;

    const motionListener = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
      reduceMotionRef.current = e.matches;
    };
    motionQuery.addEventListener("change", motionListener);

    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      motionQuery.removeEventListener("change", motionListener);
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const isMobile = viewportWidth > 0 && viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

  const radius = isMobile ? 330 : isTablet ? 450 : 580;
  const perspective = isMobile ? 1200 : isTablet ? 1600 : 2000;
  const cardWidth = isMobile ? 200 : isTablet ? 240 : 300;
  const cardHeight = isMobile ? 270 : isTablet ? 320 : 400;

  // IntersectionObserver to pause/resume animation and videos when section out of view
  useEffect(() => {
    const targetEl = sectionRef?.current || containerRef.current;
    if (!targetEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInViewRef.current = entry.isIntersecting;
          if (!entry.isIntersecting) {
            // Pause all videos when section is out of viewport to save performance
            videosRef.current.forEach((video) => {
              if (video && !video.paused) {
                video.pause();
              }
            });
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(targetEl);
    return () => observer.disconnect();
  }, [sectionRef]);

  // Optional subtle scroll interaction without stopping autonomous rotation
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!isInViewRef.current) return;
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Add small scroll influence (0.05 deg per px scrolled)
      if (Math.abs(delta) < 100) {
        rotationAngleRef.current += delta * 0.05;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Main high-performance requestAnimationFrame loop (direct DOM manipulation)
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    const numItems = items.length;
    const angleStep = 360 / numItems;

    const animate = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1); // Cap delta at 100ms
      lastTime = currentTime;

      if (isInViewRef.current && !reduceMotionRef.current) {
        // 10 degrees per second continuous autonomous rotation (within 8-15 deg/sec spec)
        const hoverMultiplier = isHoveredRef.current ? 0.4 : 1.0;
        const speed = 10;
        rotationAngleRef.current += speed * hoverMultiplier * dt;

        const currentRotation = rotationAngleRef.current;

        // Update card positions directly without triggering React re-renders
        items.forEach((_, index) => {
          const cardEl = cardsRef.current[index];
          if (!cardEl) return;

          const baseAngle = index * angleStep;
          // Sequence: 01 -> 02 -> 03 -> 04 -> 05 -> 06 -> 01
          const cardAngle = baseAngle - currentRotation;
          const rad = (cardAngle * Math.PI) / 180;

          const cosVal = Math.cos(rad);
          const normalizedCos = (cosVal + 1) / 2; // 0 (back) to 1 (front)

          // Front card strongest opacity & z-index; back/side cards remain visible
          const opacity = 0.45 + 0.55 * Math.pow(normalizedCos, 1.2);
          const zIndex = Math.round(100 * normalizedCos);

          cardEl.style.transform = `rotateY(${cardAngle}deg) translateZ(${radius}px)`;
          cardEl.style.opacity = opacity.toFixed(3);
          cardEl.style.zIndex = zIndex.toString();

          // Intelligent video play/pause based on depth & visibility
          const videoEl = videosRef.current[index];
          if (videoEl) {
            if (cosVal > -0.7) {
              if (videoEl.paused) {
                videoEl.play().catch(() => {});
              }
            } else {
              if (!videoEl.paused) {
                videoEl.pause();
              }
            }
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [items, radius, reduceMotion]);

  // Initial layout positioning before first RAF frame runs
  const numItems = items.length;
  const angleStep = 360 / numItems;

  return (
    <div
      ref={containerRef}
      aria-label="Selected Work 3D Circular Video Portfolio"
      onMouseEnter={() => {
        if (!isMobile) isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        if (!isMobile) isHoveredRef.current = false;
      }}
      className={`relative w-full overflow-hidden py-8 sm:py-12 flex items-center justify-center select-none ${className}`}
    >
      {/* 3D Scene Viewport */}
      <div
        className="relative flex items-center justify-center w-full h-[450px] sm:h-[550px] lg:h-[650px]"
        style={{
          perspective: `${perspective}px`,
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* 3D Cylinder Axis */}
        <div
          className="relative flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
          }}
        >
          {items.map((item, index) => {
            const baseAngle = index * angleStep;
            const initialAngle = baseAngle - rotationAngleRef.current;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="absolute inset-0 rounded-[12px] overflow-hidden bg-[#EAE8E2] border border-[color:var(--color-buzz-line)]/80 shadow-2xl transition-opacity duration-300 group"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `rotateY(${initialAngle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "visible",
                  willChange: "transform, opacity",
                }}
              >
                <video
                  ref={(el) => {
                    videosRef.current[index] = el;
                  }}
                  src={item.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label={`Buzzwork video ${item.index}`}
                  className="w-full h-full object-cover block transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CircularVideoGallery;

