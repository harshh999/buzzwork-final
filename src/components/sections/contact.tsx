import { useState } from "react";
import { FadeIn } from "@/components/common/fade-in";
import { SectionLabel } from "@/components/common/section-label";
import { YellowButton } from "@/components/common/yellow-button";
import { Mail, Instagram } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section
      id="contact"
      className="relative border-t border-[color:var(--color-buzz-line)] py-32 sm:py-40"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        <div className="grid gap-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <FadeIn>
              <SectionLabel>Contact</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.03em]">
                Let's make something <span className="marker-highlight">worth</span> paying
                attention to.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="mt-12 space-y-6 text-[15px]">
                <div>
                  <div className="text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-buzz-muted)]">
                    Email
                  </div>
                  <a
                    className="mt-1 flex w-fit items-center gap-2 border-b border-transparent transition hover:border-[color:var(--color-buzz-yellow)] hover:text-[color:var(--color-buzz-ink)]"
                    href="mailto:buzzworkkk@gmail.com"
                  >
                    <Mail className="h-4 w-4" />
                    <span>buzzworkkk@gmail.com</span>
                  </a>
                </div>

                <div>
                  <div className="text-[12px] uppercase tracking-[0.18em] text-[color:var(--color-buzz-muted)]">
                    Socials
                  </div>
                  <div className="mt-1 flex gap-5 text-[color:var(--color-buzz-muted)]">
                    <a
                      href="https://www.instagram.com/buzzworkkk_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-fit items-center gap-2 border-b border-transparent transition hover:border-[color:var(--color-buzz-yellow)] hover:text-[color:var(--color-buzz-ink)]"
                    >
                      <Instagram className="h-4 w-4" />
                      <span>@buzzworkkk_</span>
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <FadeIn delay={0.15}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-1"
              >
                <Field label="Name" name="name" />
                <Field label="Company" name="company" />
                <Field label="Email" name="email" type="email" required />

                <Field label="Message" name="message" textarea />
                <div className="pt-8">
                  <YellowButton type="submit">
                    {sent ? "Sent — we'll be in touch" : "Send message"}
                  </YellowButton>
                </div>
              </form>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}

function Field({ label, name, type = "text", textarea, required }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const active = focused || value.length > 0;
  const common = {
    id: name,
    name,
    required,
    value,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValue(e.target.value),
    className: "block w-full bg-transparent pb-3 pt-6 text-[16px] outline-none",
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
      </label>
      {textarea ? <textarea rows={4} {...common} /> : <input type={type} {...common} />}
    </div>
  );
}
