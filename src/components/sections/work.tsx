import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SectionLabel } from "@/components/common/section-label";
import { MarkerUnderline } from "@/components/common/creative-accents";
import { CircularVideoGallery, type CircularVideoItem } from "@/components/ui/circular-video-gallery";

const CIRCULAR_VIDEOS: CircularVideoItem[] = [
  {
    id: "01",
    index: "01",
    url: "https://res.cloudinary.com/diqslwugu/video/upload/showcase2re_umvk8w.mp4",
    label: "VIDEO",
    title: "SOCIAL CONTENT",
    category: "CONTENT",
  },
  {
    id: "02",
    index: "02",
    url: "https://res.cloudinary.com/diqslwugu/video/upload/showcase6re_zqxcho.mp4",
    label: "VIDEO",
    title: "BRAND CAMPAIGN",
    category: "CAMPAIGN",
  },
  {
    id: "03",
    index: "03",
    url: "https://res.cloudinary.com/diqslwugu/video/upload/v1790669709/showcase4re2_ksqwcv.mp4",
    label: "VIDEO",
    title: "CREATIVE PRODUCTION",
    category: "PRODUCTION",
  },
  {
    id: "04",
    index: "04",
    url: "https://res.cloudinary.com/diqslwugu/video/upload/v1790669707/showcase3re_w9ctlh.mp4",
    label: "VIDEO",
    title: "SOCIAL MEDIA",
    category: "SOCIAL",
  },
  {
    id: "05",
    index: "05",
    url: "https://res.cloudinary.com/diqslwugu/video/upload/v1790669689/showcase1re_kuk2ds.mp4",
    label: "VIDEO",
    title: "VIDEO PRODUCTION",
    category: "VIDEO",
  },
  {
    id: "06",
    index: "06",
    url: "https://res.cloudinary.com/diqslwugu/video/upload/v1790669674/showcase5re_rqqcvw.mp4",
    label: "VIDEO",
    title: "CONTENT CAMPAIGN",
    category: "CAMPAIGN",
  },
];

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full border-t border-[color:var(--color-buzz-line)] pt-20 sm:pt-28 pb-20 sm:pb-28 overflow-hidden bg-transparent z-10"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8 mb-6 sm:mb-8" ref={headerRef}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel>SELECTED WORK</SectionLabel>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 font-display text-[clamp(42px,5vw,76px)] font-medium leading-[0.95] tracking-[-0.04em] text-[color:var(--color-buzz-ink)]"
            >
              Content built to be{" "}
              <span className="relative inline-block">
                <em className="not-italic">seen</em>
                <MarkerUnderline className="absolute -bottom-1 left-0 h-2 w-full text-[color:var(--color-buzz-yellow)]" />
              </span>
              .
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <p className="max-w-[360px] text-[15px] sm:text-[16px] leading-[1.5] text-[color:var(--color-buzz-muted)] opacity-65">
              Social content, campaigns and production work created to make brands impossible to ignore.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Autonomous 3D Circular Video Gallery */}
      <div className="w-full flex items-center justify-center">
        <CircularVideoGallery items={CIRCULAR_VIDEOS} sectionRef={sectionRef} />
      </div>
    </section>
  );
}




