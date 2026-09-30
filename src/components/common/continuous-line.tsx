import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "@tanstack/react-router";

interface GeometryState {
  width: number;
  height: number;
  windowHeight: number;
  footerTop: number;
  targetX: number;
  targetY: number;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function ContinuousEditorialLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const markerYellowRef = useRef<SVGGElement>(null);
  const markerGrayRef = useRef<SVGGElement>(null);
  const markerSquareRef = useRef<SVGGElement>(null);

  const location = useLocation();
  const reducedMotion = useReducedMotion();

  const [geometry, setGeometry] = useState<GeometryState>({
    width: 0,
    height: 0,
    windowHeight: 0,
    footerTop: 0,
    targetX: 0,
    targetY: 0,
  });

  const measure = useCallback(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const docEl = document.documentElement;
    const body = document.body;
    const container = containerRef.current;

    // Use container rect if available to get exact local coordinates
    const containerRect = container?.getBoundingClientRect();
    const docScrollY = window.scrollY || docEl.scrollTop || 0;
    const docScrollX = window.scrollX || docEl.scrollLeft || 0;

    const width = docEl.clientWidth;
    const height = Math.max(
      docEl.scrollHeight,
      body.scrollHeight,
      docEl.offsetHeight,
      containerRect ? containerRect.height : 0
    );
    const windowHeight = window.innerHeight;

    const footer = document.querySelector("footer");
    const logo = document.getElementById("footer-buzzwork-logo");

    const isMobile = width < 768;

    // Calculate footer top relative to container
    let footerTop = height - 550;
    if (footer) {
      const fRect = footer.getBoundingClientRect();
      if (containerRect) {
        footerTop = fRect.top - containerRect.top;
      } else {
        footerTop = fRect.top + docScrollY;
      }
    }

    // Calculate logo target endpoint (right edge, vertical center) relative to container
    let targetX = isMobile ? 100 : 140;
    let targetY = footerTop + (isMobile ? 320 : 380);

    if (logo) {
      const lRect = logo.getBoundingClientRect();
      const actualWidth = lRect.width > 0 ? lRect.width : (isMobile ? 75 : 85);
      const actualHeight = lRect.height > 0 ? lRect.height : (isMobile ? 36 : 41);

      if (containerRect) {
        const rightEdge = lRect.width > 0 ? lRect.right : (lRect.left + actualWidth);
        targetX = rightEdge - containerRect.left;
        targetY = lRect.top + actualHeight / 2 - containerRect.top;
      } else {
        const rightEdge = lRect.width > 0 ? lRect.right : (lRect.left + actualWidth);
        targetX = rightEdge + docScrollX;
        targetY = lRect.top + actualHeight / 2 + docScrollY;
      }
    }

    setGeometry({
      width,
      height,
      windowHeight,
      footerTop,
      targetX,
      targetY,
    });
  }, []);

  useEffect(() => {
    measure();

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });

    resizeObserver.observe(document.body);

    const footer = document.querySelector("footer");
    if (footer) resizeObserver.observe(footer);

    const logo = document.getElementById("footer-buzzwork-logo");
    if (logo) {
      resizeObserver.observe(logo);
      if (logo instanceof HTMLImageElement && !logo.complete) {
        logo.addEventListener("load", measure, { once: true });
      }
    }

    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    window.addEventListener("load", measure);

    // Initial stabilization timers to catch hydration and font load
    const t1 = setTimeout(measure, 60);
    const t2 = setTimeout(measure, 200);
    const t3 = setTimeout(measure, 600);
    const t4 = setTimeout(measure, 1500);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      window.removeEventListener("load", measure);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [measure]);

  // Re-measure when route changes (e.g. '/' vs '/contact')
  useEffect(() => {
    const timer = setTimeout(measure, 50);
    return () => clearTimeout(timer);
  }, [location.pathname, measure]);

  const { width, height, windowHeight, footerTop, targetX, targetY } = geometry;

  const isMobile = width < 768;

  // Path coordinates across light sections
  const startY = 150;
  const m = isMobile ? 0.07 : 0.12; // margin
  const left = width * m;
  const right = width * (1 - m);
  const midLeft = width * (m + 0.16);
  const midRight = width * (1 - m - 0.16);

  // Logo right edge target
  const dotX = targetX;
  const dotY = targetY;

  // Controlled, natural footer entry point
  const entryX = isMobile
    ? Math.max(dotX + 40, width * 0.28)
    : Math.max(dotX + 80, width * 0.24);
  const entryY = footerTop;
  const fHeight = Math.max(dotY - entryY, 140);

  // Single continuous editorial path:
  // Flows smoothly through upper sections, then gracefully transitions into
  // a shallow, restrained S-curve in the footer that levels out horizontally
  // directly into the right edge of the Buzzwork logo.
  const pathData = `
    M ${right},${startY}
    C ${right},${footerTop * 0.16} ${midLeft},${footerTop * 0.24} ${left},${footerTop * 0.36}
    C ${left},${footerTop * 0.48} ${midRight},${footerTop * 0.54} ${right},${footerTop * 0.66}
    C ${right},${footerTop * 0.78} ${entryX + (isMobile ? 20 : 40)},${footerTop * 0.88} ${entryX},${entryY}
    C ${entryX - (isMobile ? 12 : 25)},${entryY + fHeight * 0.48} ${dotX + (isMobile ? 35 : 55)},${dotY} ${dotX},${dotY}
  `;

  // Set up scroll-driven drawing animation
  useEffect(() => {
    const path = pathRef.current;
    if (!path || height === 0 || width === 0) return;

    let pathLength = 0;
    try {
      pathLength = path.getTotalLength();
    } catch {
      return;
    }

    if (pathLength === 0) return;

    // Stroke dasharray matches exact pathLength so visible line ends precisely at drawnLength
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;

    const p1Length = pathLength * 0.05;
    const p2Length = pathLength * 0.5;

    // Position fixed markers along the path
    if (markerGrayRef.current) {
      const p1 = path.getPointAtLength(p1Length);
      markerGrayRef.current.setAttribute("transform", `translate(${p1.x}, ${p1.y})`);
      markerGrayRef.current.style.opacity = "0";
    }

    if (markerSquareRef.current) {
      const p2 = path.getPointAtLength(p2Length);
      markerSquareRef.current.setAttribute("transform", `translate(${p2.x}, ${p2.y}) rotate(45)`);
      markerSquareRef.current.style.opacity = "0";
    }

    let rafId: number;
    let lastScrollY = -1;

    const onFrame = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;

      if (scrollY !== lastScrollY || reducedMotion) {
        lastScrollY = scrollY;

        const maxScroll = Math.max(height - windowHeight, 1);
        const scrollProgress = reducedMotion
          ? 1
          : Math.min(Math.max(scrollY / maxScroll, 0), 1);

        const isAtBottom = scrollProgress >= 0.998 || scrollY >= maxScroll - 2;
        const drawnLength = isAtBottom
          ? pathLength
          : Math.max(0, Math.min(pathLength, scrollProgress * pathLength));

        // Exactly drawnLength is visible; nothing extends beyond it
        path.style.strokeDashoffset = `${pathLength - drawnLength}`;

        // Yellow dot is the exact live head/endpoint of the line
        if (markerYellowRef.current) {
          if (isAtBottom || drawnLength >= pathLength - 1) {
            markerYellowRef.current.setAttribute("transform", `translate(${dotX}, ${dotY})`);
          } else {
            const currentPoint = path.getPointAtLength(drawnLength);
            markerYellowRef.current.setAttribute(
              "transform",
              `translate(${currentPoint.x}, ${currentPoint.y})`
            );
          }
        }

        // Accents reveal only as the yellow dot reaches them
        if (markerGrayRef.current) {
          markerGrayRef.current.style.opacity = drawnLength >= p1Length ? "1" : "0";
        }
        if (markerSquareRef.current) {
          markerSquareRef.current.style.opacity = drawnLength >= p2Length ? "1" : "0";
        }
      }

      if (!reducedMotion) {
        rafId = requestAnimationFrame(onFrame);
      }
    };

    onFrame();
    if (!reducedMotion) {
      rafId = requestAnimationFrame(onFrame);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [pathData, height, width, windowHeight, reducedMotion, dotX, dotY]);

  if (width === 0 || height === 0) return null;

  // Gradient transition from dark #111111 (light sections) to #FFFFFF (black footer)
  const pStart = Math.max(0, Math.min(99.5, ((footerTop - 30) / height) * 100));
  const pEnd = Math.max(pStart + 0.1, Math.min(100, ((footerTop + 30) / height) * 100));

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[15] overflow-hidden"
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full block pointer-events-none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="continuous-editorial-gradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2={height}
          >
            {/* Dark stroke on light sections */}
            <stop offset="0%" stopColor="#111111" stopOpacity="0.14" />
            <stop offset={`${pStart}%`} stopColor="#111111" stopOpacity="0.14" />
            {/* Smooth transition into white stroke across footer entry boundary */}
            <stop offset={`${pEnd}%`} stopColor="#FFFFFF" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.32" />
          </linearGradient>
        </defs>

        {/* The single continuous line */}
        <path
          ref={pathRef}
          d={pathData}
          fill="none"
          stroke="url(#continuous-editorial-gradient)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Fixed Markers on the upper path */}
        <g ref={markerGrayRef}>
          <circle r="2" fill="rgba(17,17,17,0.25)" />
        </g>
        <g ref={markerSquareRef}>
          <rect
            x="-4"
            y="-4"
            width="8"
            height="8"
            fill="none"
            stroke="#FFD400"
            strokeWidth="1.5"
          />
        </g>

        {/* Moving Yellow Dot: the true terminal point of the line during and after scroll */}
        <g ref={markerYellowRef}>
          <circle r="2.5" fill="#FFD400" />
        </g>
      </svg>
    </div>
  );
}

