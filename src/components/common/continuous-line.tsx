import { useEffect, useRef, useState } from "react";

export function ContinuousEditorialLine() {
  const pathRef = useRef<SVGPathElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const markerYellowRef = useRef<SVGGElement>(null);
  const markerGrayRef = useRef<SVGGElement>(null);
  const markerSquareRef = useRef<SVGGElement>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0, windowHeight: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.scrollHeight,
        windowHeight: window.innerHeight,
      });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    
    resizeObserver.observe(document.body);
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("orientationchange", updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("orientationchange", updateDimensions);
    };
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || dimensions.height === 0) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    // Set fixed markers once path is calculated
    if (markerGrayRef.current) {
      const p1 = path.getPointAtLength(pathLength * 0.05);
      markerGrayRef.current.setAttribute("transform", `translate(${p1.x}, ${p1.y})`);
    }
    
    if (markerSquareRef.current) {
      const p2 = path.getPointAtLength(pathLength * 0.5);
      markerSquareRef.current.setAttribute("transform", `translate(${p2.x}, ${p2.y}) rotate(45)`);
    }

    let rafId: number;
    let lastScrollY = -1;

    const onFrame = () => {
      const scrollY = window.scrollY;
      
      // Only recalculate if scroll changed
      if (scrollY !== lastScrollY) {
        lastScrollY = scrollY;
        
        const maxScroll = Math.max(dimensions.height - dimensions.windowHeight, 1);
        const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
        
        const offset = pathLength - (scrollProgress * pathLength);
        path.style.strokeDashoffset = `${offset}`;

        // Scroll the SVG group to match the document scroll
        if (groupRef.current) {
          groupRef.current.setAttribute("transform", `translate(0, -${scrollY})`);
        }

        // Update the moving marker
        if (markerYellowRef.current) {
          const currentPoint = path.getPointAtLength(scrollProgress * pathLength);
          markerYellowRef.current.setAttribute("transform", `translate(${currentPoint.x}, ${currentPoint.y})`);
        }
      }

      rafId = requestAnimationFrame(onFrame);
    };

    rafId = requestAnimationFrame(onFrame);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [dimensions]);

  const { width, height, windowHeight } = dimensions;
  
  // Don't render until we have dimensions to avoid layout jumps
  if (width === 0 || height === 0) return null;

  const isMobile = width < 768;

  // Path coordinates based on full document height
  const startY = 150;
  const endY = height - 100;
  
  const m = isMobile ? 0.08 : 0.15; // margin
  const left = width * m;
  const right = width * (1 - m);
  const midLeft = width * (m + 0.2);
  const midRight = width * (1 - m - 0.2);

  // Create a sophisticated editorial curve weaving through the page
  const pathData = `
    M ${right},${startY} 
    C ${right},${height * 0.12} ${midLeft},${height * 0.2} ${left},${height * 0.3} 
    S ${midRight},${height * 0.5} ${right},${height * 0.6} 
    S ${left},${height * 0.8} ${midLeft},${height * 0.85}
    S ${width * 0.5},${height * 0.95} ${width * 0.5},${endY}
  `;

  return (
    <div 
      className="fixed top-0 left-0 w-[100vw] h-[100vh] pointer-events-none z-[1]" 
      aria-hidden="true"
    >
      <svg 
        viewBox={`0 0 ${width} ${windowHeight}`} 
        className="w-full h-full opacity-60 md:opacity-100"
        preserveAspectRatio="xMidYMid slice"
      >
        <g ref={groupRef}>
          <path
            ref={pathRef}
            d={pathData}
            fill="none"
            stroke="rgba(0,0,0,0.12)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Fixed Markers */}
          <g ref={markerGrayRef}>
            <circle r="2" fill="rgba(0,0,0,0.25)" />
          </g>
          <g ref={markerSquareRef}>
            <rect x="-4" y="-4" width="8" height="8" fill="none" stroke="var(--color-buzz-yellow)" strokeWidth="1.5" />
          </g>
          
          {/* Moving Marker */}
          <g ref={markerYellowRef}>
            <circle r="3" fill="var(--color-buzz-yellow)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
