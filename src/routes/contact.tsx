import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import Lenis from "lenis";

import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Contact } from "@/components/sections/contact";
import { PaperGrain } from "@/components/common/creative-accents";
import { ContinuousEditorialLine } from "@/components/common/continuous-line";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact | Buzzwork — Creative Marketing Agency" },
      {
        name: "description",
        content:
          "Get in touch with Buzzwork, a creative marketing agency engineering visibility through strategy, content, and performance.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
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
      <main className="relative z-10 pt-16 sm:pt-20">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
