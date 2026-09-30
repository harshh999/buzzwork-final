import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Mail, Instagram, Linkedin, CheckCircle2, AlertCircle } from "lucide-react";
import { SectionLabel } from "@/components/common/section-label";

/* ─── Shared ease curve ─── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Reduced-motion guard ─── */
function useReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ─── Fade-up animation wrapper ─── */
function FadeBlock({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={inView || reduced ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const reduced = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      return;
    }

    setStatus("submitting");
    try {
      // Simulate submission transition
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus("success");
      setFormState({ name: "", company: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact-page-section"
      aria-label="Contact Buzzwork"
      className="relative w-full pt-6 pb-20 sm:pt-10 sm:pb-28 text-[color:var(--color-buzz-ink)]"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* Left Column: Eyebrow, Headline, Description & (Desktop) Contact Details */}
          <div className="lg:col-span-5">
            <FadeBlock>
              <SectionLabel>CONTACT</SectionLabel>
            </FadeBlock>

            <FadeBlock delay={0.08}>
              <h1 className="mt-6 font-display text-[clamp(2.5rem,4.8vw,4.25rem)] font-medium leading-[1.03] tracking-[-0.03em]">
                Let's make something <span className="marker-highlight">worth</span> paying
                attention to.
              </h1>
            </FadeBlock>

            <FadeBlock delay={0.14}>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-[color:var(--color-buzz-muted)]">
                Have a project, idea, or brand that needs attention? Tell us what you're working on.
              </p>
            </FadeBlock>

            {/* Desktop Contact Details */}
            <FadeBlock delay={0.2} className="hidden lg:block mt-12 sm:mt-16">
              <ContactInfoBlock />
            </FadeBlock>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <FadeBlock delay={0.12}>
              <form onSubmit={handleSubmit} className="space-y-2">
                <Field
                  label="Name"
                  name="name"
                  required
                  value={formState.name}
                  onChange={(v) => setFormState((prev) => ({ ...prev, name: v }))}
                  disabled={status === "submitting"}
                />
                <Field
                  label="Company"
                  name="company"
                  value={formState.company}
                  onChange={(v) => setFormState((prev) => ({ ...prev, company: v }))}
                  disabled={status === "submitting"}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(v) => setFormState((prev) => ({ ...prev, email: v }))}
                  disabled={status === "submitting"}
                />
                <Field
                  label="Tell us about the project"
                  name="message"
                  textarea
                  required
                  value={formState.message}
                  onChange={(v) => setFormState((prev) => ({ ...prev, message: v }))}
                  disabled={status === "submitting"}
                />

                {/* Submit button & feedback */}
                <div className="pt-6 sm:pt-8 flex flex-col gap-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#111111] px-7 py-3 text-[14px] font-medium text-white shadow-sm transition-all duration-300 hover:bg-black hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 cursor-pointer"
                  >
                    <span>{status === "submitting" ? "Sending..." : "Send message"}</span>
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </button>

                  {/* Status Alerts */}
                  {status === "success" && (
                    <motion.div
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2.5 rounded-xl bg-black/[0.03] border border-black/[0.08] px-4 py-3 text-[14px] text-[color:var(--color-buzz-ink)]"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[color:var(--color-buzz-yellow)] shrink-0" />
                      <span>Thanks — we'll get back to you shortly.</span>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2.5 rounded-xl bg-red-500/[0.05] border border-red-500/20 px-4 py-3 text-[14px] text-red-600"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>Something went wrong. Please try again or email us directly.</span>
                    </motion.div>
                  )}
                </div>
              </form>

              {/* Mobile Contact Details (positioned below form) */}
              <div className="block lg:hidden mt-12 pt-8 border-t border-[color:var(--color-buzz-line)]">
                <ContactInfoBlock />
              </div>
            </FadeBlock>
          </div>

        </div>
      </div>
    </section>
  );
}

function ContactInfoBlock() {
  return (
    <div className="space-y-6 text-[15px]">
      <div>
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--color-buzz-muted)]">
          Email
        </div>
        <a
          className="group mt-1.5 flex w-fit items-center gap-2 border-b border-transparent transition-all duration-200 hover:border-[color:var(--color-buzz-yellow)] hover:text-[color:var(--color-buzz-ink)]"
          href="mailto:buzzworkkk@gmail.com"
        >
          <Mail className="h-4 w-4 text-[color:var(--color-buzz-muted)] group-hover:text-[color:var(--color-buzz-ink)] transition-colors" />
          <span>buzzworkkk@gmail.com</span>
        </a>
      </div>

      <div>
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--color-buzz-muted)]">
          Socials
        </div>
        <div className="mt-1.5 flex gap-5 text-[color:var(--color-buzz-muted)]">
          <a
            href="https://www.instagram.com/buzzworkkk_/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-fit items-center gap-2 border-b border-transparent transition-all duration-200 hover:border-[color:var(--color-buzz-yellow)] hover:text-[color:var(--color-buzz-ink)]"
          >
            <Instagram className="h-4 w-4 text-[color:var(--color-buzz-muted)] group-hover:text-[color:var(--color-buzz-ink)] transition-colors" />
            <span>Instagram</span>
          </a>
          <a
            href="https://www.linkedin.com/company/buzzworkkk/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-fit items-center gap-2 border-b border-transparent transition-all duration-200 hover:border-[color:var(--color-buzz-yellow)] hover:text-[color:var(--color-buzz-ink)]"
          >
            <Linkedin className="h-4 w-4 text-[color:var(--color-buzz-muted)] group-hover:text-[color:var(--color-buzz-ink)] transition-colors" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

function Field({
  label,
  name,
  type = "text",
  textarea,
  required,
  value,
  onChange,
  disabled,
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const common = {
    id: name,
    name,
    required,
    value,
    disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    className:
      "block w-full bg-transparent pb-3 pt-6 text-[16px] outline-none text-[color:var(--color-buzz-ink)] disabled:opacity-50",
  };
  return (
    <div className="relative border-b border-[color:var(--color-buzz-line)] transition-colors focus-within:border-[color:var(--color-buzz-ink)]">
      <label
        htmlFor={name}
        className={[
          "pointer-events-none absolute left-0 origin-left transition-all duration-300 ease-out",
          active
            ? "top-1 text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-buzz-muted)]"
            : "top-6 text-[16px] text-[color:var(--color-buzz-muted)]",
        ].join(" ")}
      >
        {label}
        {required && <span className="ml-1 text-[color:var(--color-buzz-yellow)]">*</span>}
      </label>
      {textarea ? (
        <textarea rows={4} {...common} className={`${common.className} resize-none`} />
      ) : (
        <input type={type} {...common} />
      )}
    </div>
  );
}
