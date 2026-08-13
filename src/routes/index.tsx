import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import Lenis from "lenis";

import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { ServicesTicker } from "@/components/sections/services-ticker";
import { Work } from "@/components/sections/work";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { PaperGrain } from "@/components/common/creative-accents";
import { ContinuousEditorialLine } from "@/components/common/continuous-line";

export const Route = createFileRoute("/")({
  component: BuzzworkLanding,
  head: () => ({
    meta: [
      { property: "og:image", content: "/images/image_1.jpg" },
      { property: "og:url", content: "/" },
      { name: "twitter:image", content: "/images/image_1.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Buzzwork",
          description:
            "Buzzwork is a creative marketing agency engineering visibility through strategy, content, and performance.",
          url: "/",
          image: "/images/image_1.jpg",
          serviceType: [
            "Social Media Management",
            "Content Creation",
            "Video Production",
            "Performance Marketing",
            "Branding & Identity",
            "Influencer Marketing",
            "Website Design & Development",
            "Analytics & Reporting",
          ],
        }),
      },
    ],
  }),
});

function BuzzworkLanding() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[color:var(--color-buzz-bg)] text-[color:var(--color-buzz-ink)] font-sans antialiased selection:bg-[color:var(--color-buzz-yellow)] selection:text-[color:var(--color-buzz-ink)]">
      <PaperGrain />
      <ContinuousEditorialLine />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <ServicesTicker />
        <Work />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
