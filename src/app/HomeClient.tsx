"use client";

import Image from "next/image";
import {
  motion,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useId, useRef, useState, type RefObject } from "react";

const MAILTO =
  "mailto:faizanmotionss@gmail.com?subject=Marketing%20website%20inquiry";

const GRADIENT_BG =
  "linear-gradient(90deg, rgb(207, 250, 157) 0%, rgb(255, 199, 200) 52.404%, rgb(157, 194, 250) 100%)";

const CTA_INTERACTION =
  "cursor-pointer select-none bg-[#2a7bf4] font-medium text-white transition-[background-color,transform] duration-200 ease-out hover:scale-[1.03] hover:bg-[#428af5] active:scale-[0.97] active:bg-[#0d69f2]";

function useElementWidth(ref: RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return width;
}

export default function HomeClient() {
  return (
    <div className="flex min-h-screen w-full flex-col items-start bg-[#333b47] lg:h-screen lg:flex-row lg:overflow-hidden">
      <div className="flex w-full shrink-0 flex-col overflow-hidden lg:h-full lg:w-[458px] lg:border-r lg:border-[#22272f]">
        <div className="flex w-full flex-1 flex-col justify-between px-4 pb-6 pt-9 lg:px-9">
          <div className="flex flex-col items-start justify-center gap-6">
            <div className="flex w-full flex-col items-start gap-4">
              <div className="relative size-[35px] shrink-0 overflow-hidden rounded-lg bg-[#8290a5]">
                <Image
                  src="/profile.png"
                  alt="Faizan"
                  fill
                  sizes="35px"
                  className="object-cover"
                />
              </div>

              <div className="flex w-full flex-col items-start justify-center gap-3">
                <h1 className="w-full text-[24px] font-medium leading-[1.1] tracking-[-0.96px] text-white">
                  Become more credible by refreshing your marketing website in
                  weeks
                </h1>
                <p className="w-full text-sm font-medium leading-[1.5] tracking-[-0.28px] text-[#949ca6]">
                  A 2-3 week focused sprint where we refresh your visual
                  direction &amp; build a credible homepage to show it i.e the
                  80% of your website that 100% of your visitors see
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <a
                href={MAILTO}
                className={`${CTA_INTERACTION} rounded-[18px] px-4 py-2 text-sm leading-5 tracking-[-0.28px]`}
              >
                Book A Call
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start justify-end pt-[26px] lg:pt-4">
            <div className="flex w-full flex-col items-start gap-2 pt-4 text-sm tracking-[-0.28px]">
              <h2 className="font-semibold leading-[1.5] text-[#949ca6]">
                Who I help?
              </h2>
              <p className="font-medium leading-[1.5] text-white">
                Early-Stage SaaS &amp; AI Startups{" "}
                <span className="text-[#949ca6]">
                  who want to become more credible and don&rsquo;t have 3
                  months to wait for their new direction &amp; website
                </span>
              </p>
            </div>
          </div>
        </div>

        <SiteFooter className="hidden lg:flex" />
      </div>

      <div className="relative min-h-[560px] w-full flex-1 overflow-y-auto bg-[#22272f] lg:h-full">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 24 }}
        >
          <CaseStudies />
          <ProcessSection />
          <InvestmentSection />
        </motion.div>
      </div>

      <SiteFooter className="flex lg:hidden" />
    </div>
  );
}

function SiteFooter({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`w-full items-center justify-center border-t border-[#4d5461] bg-[#333b47] px-4 py-4 lg:px-9 ${className}`}
    >
      <div className="flex w-full max-w-[1400px] items-center justify-between">
        <p className="text-xs leading-[16.8px] text-white">
          Copyright @project-faizan
        </p>
        <a
          href="https://x.com/projectfaizan"
          target="_blank"
          rel="noopener noreferrer"
          className="relative h-[18.5px] w-[37px] shrink-0"
        >
          <Image src="/x-logo.svg" alt="X" fill className="object-contain" />
        </a>
      </div>
    </footer>
  );
}

/* Gradient text + chevron that drift through the same three colors together. */
function GradientLink({ label, href = "#" }: { label: string; href?: string }) {
  const gradientId = `arrow-gradient-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <a href={href} className="inline-flex w-fit select-none items-center gap-1">
      <span
        className="animate-gradient-flow bg-clip-text text-xs font-medium leading-4 tracking-[-0.24px] text-transparent"
        style={{ backgroundImage: GRADIENT_BG }}
      >
        {label}
      </span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden
      >
        <defs>
          <linearGradient
            id={gradientId}
            gradientUnits="objectBoundingBox"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop offset="0%" stopColor="rgb(207, 250, 157)" />
            <stop offset="52.404%" stopColor="rgb(255, 199, 200)" />
            <stop offset="100%" stopColor="rgb(157, 194, 250)" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-1 0.3; 0.4 -0.2; -0.6 0.1; 0.9 -0.3; -1 0.3"
              keyTimes="0; 0.22; 0.48; 0.71; 1"
              dur="8s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
            />
          </linearGradient>
        </defs>
        <path
          d="M5.25 2.91667L9.33333 7L5.25 11.0833"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

function Checklist({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-2 border-t border-[#2f3641] pt-4">
      <p className="text-[14px] font-medium leading-[1.1] tracking-[-0.28px] text-[#949ca6]">
        {label}
      </p>
      <ul className="flex flex-col gap-[6px] text-white">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-1">
            <span aria-hidden className="shrink-0 text-[14.328px] leading-normal">
              ✓
            </span>
            <span className="min-w-0 flex-1 text-[14px] font-medium leading-[1.6] tracking-[-0.28px]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------- Case studies ---------------------------------- */

type CaseStudy = {
  tag: string;
  title: string;
  description: string;
  linkLabel: string;
};

const CASE_STUDY_DESCRIPTION =
  "The current Look of the brand & website was not credible enough to close B2B deals and the brand so we ran our Brand & Homepage sprint";

const CASE_STUDIES: CaseStudy[] = [
  {
    tag: "Brand + Homepage",
    title: "ormedo tech - AI-powered outbound sales",
    description: CASE_STUDY_DESCRIPTION,
    linkLabel: "Full Case Study (coming soon)",
  },
  {
    tag: "Brand + Homepage",
    title: "Flowpilot - AI-powered outbound sales",
    description: CASE_STUDY_DESCRIPTION,
    linkLabel: "Full Case Study (coming soon)",
  },
];

function CaseStudies() {
  return (
    <div className="px-4 pt-6 lg:px-6 lg:pt-9">
      <div className="mx-auto flex w-full max-w-[934px] flex-col gap-8">
        {CASE_STUDIES.map((item) => (
          <CaseStudyCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}

function CaseStudyCard({ item }: { item: CaseStudy }) {
  return (
    <article className="flex w-full flex-col gap-4">
      <div className="aspect-[1920/1080] w-full bg-[#333b47]" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-end sm:gap-3">
        <div className="flex flex-col items-start gap-2 sm:min-w-0 sm:flex-1">
          <p className="w-fit whitespace-nowrap rounded-[14px] border border-[#5c6a7f] px-1 py-0.5 text-[12px] font-medium leading-[1.3] tracking-[-0.12px] text-[#8f9bae]">
            {item.tag}
          </p>
          <h2 className="max-w-[285px] text-[20px] font-medium capitalize leading-[1.2] tracking-[-0.4px] text-white">
            {item.title}
          </h2>
        </div>
        <div className="flex flex-col items-start gap-3 sm:w-[258px] sm:shrink-0">
          <p className="text-[12px] font-medium leading-[1.3] tracking-[-0.24px] text-[#949ca6]">
            {item.description}
          </p>
          <GradientLink label={item.linkLabel} />
        </div>
      </div>
    </article>
  );
}

/* ----------------------------------- Process ----------------------------------- */

type Stage = {
  tag: string;
  title: string;
  description: string;
  results: string[];
};

const STAGES: Stage[] = [
  {
    tag: "Stage 1",
    title: "Your Messaging, Story & Structure",
    description:
      "We run a messaging & story workshop where we understand your business, goals, target market & your brand story to create page structure & write a clear copy",
    results: [
      "Clear Page-Structure",
      "DFY Copywriting",
      "Detailed Page Wireframe",
    ],
  },
  {
    tag: "Stage 2",
    title: "your new visual direction",
    description:
      "We present 3 distinctive mood-boards and you choose which one you like and we build the visual system around it",
    results: [
      "3 Visual Directions to choose from",
      "Refreshed Colors & Typography",
      "Imagery System",
    ],
  },
  {
    tag: "Stage 3",
    title: "Design, Develop & launch",
    description:
      "The final stage where we put your new visual direction, copy on the page structure we created earlier and we also build it for you",
    results: [
      "High-Fidelity Homepage Design (Figma File)",
      "Fully Responsive Framer or NextJs Build",
    ],
  },
];

// Where each card sits inside the 934px-wide zig-zag (matches the Figma frame).
const STAGE_POSITIONS = [
  { left: 62, top: 34.25 },
  { left: 512, top: 188.25 },
  { left: 131, top: 588.25 },
];

function StageCard({ stage }: { stage: Stage }) {
  return (
    <div className="flex w-full flex-col gap-6 bg-[#2f3641] p-6">
      <div className="flex w-full flex-col items-start gap-3">
        <p className="w-fit whitespace-nowrap rounded-[14px] border border-[#7d8ba1] px-1 py-0.5 text-[12px] font-medium leading-[1.3] tracking-[-0.12px] text-[#b5bdc9]">
          {stage.tag}
        </p>
        <h3 className="text-[24px] font-semibold capitalize leading-[1.2] tracking-[-0.96px] text-white">
          {stage.title}
        </h3>
        <p className="text-[12px] font-medium leading-[1.3] tracking-[-0.24px] text-[#949ca6]">
          {stage.description}
        </p>
      </div>
      <Checklist label="The result:" items={stage.results} />
    </div>
  );
}

function useMinWidth(px: number) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${px}px)`);
    const update = () => setMatches(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [px]);

  return matches;
}

// How far (px, each way) an element drifts as the section scrolls past. Offsets
// are zero at the middle of the pass, where everything sits as designed.
//
// Zig-zag: limited by the gaps in the left column (card 1 -> heading is 63px,
// heading -> card 3 is 101px), so the whole left column drifts the same way at
// graded speeds, and card 2 (alone in the right column, so free to move)
// travels the furthest.
const ZIGZAG_AMPLITUDES = { heading: 200, cards: [260, 420, 240] };
// Stacked: neighbours are 64px apart and each element drifts at most ~40px
// more than the one above it, so they can't touch.
const STACKED_AMPLITUDES = { heading: 60, cards: [140, 220, 300] };

function ParallaxItem({
  progress,
  amplitude,
  enabled,
  className,
  style,
  children,
}: {
  progress: MotionValue<number>;
  amplitude: number;
  enabled: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const y = useTransform(progress, [0, 1], [amplitude, -amplitude]);

  return (
    <motion.div className={className} style={{ ...style, ...(enabled ? { y } : {}) }}>
      {children}
    </motion.div>
  );
}

function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const width = useElementWidth(ref);
  // The zig-zag is laid out for a 934px canvas; below that it stacks.
  const wide = width >= 896;
  const reduceMotion = useReducedMotion();
  // Parallax everywhere except phones.
  const tabletUp = useMinWidth(768);
  const parallax = tabletUp && !reduceMotion;
  const amplitudes = wide ? ZIGZAG_AMPLITUDES : STACKED_AMPLITUDES;

  // 0 = section just entering the bottom of the viewport, 1 = just leaving the
  // top.
  const progress = useMotionValue(0.5);

  useEffect(() => {
    if (!parallax) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const next = (viewport - rect.top) / (viewport + rect.height);
      progress.set(Math.min(1, Math.max(0, next)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    // Capture phase so it also fires for the inner scroll panel on desktop
    // (scroll events don't bubble) as well as the window on mobile.
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
    };
  }, [parallax, progress]);

  const heading = (
    <h2 className="text-[20px] font-medium capitalize leading-[1.21] tracking-[-0.4px] text-white">
      [ Your refreshed site is just 3 stages away ]
    </h2>
  );

  return (
    <div className="px-4 lg:px-6">
      <div className="mx-auto mt-12 w-full max-w-[934px] lg:mt-[73px]">
        <div
          ref={ref}
          className={`relative border-t border-[#2f3641] ${wide ? "h-[997px]" : ""}`}
        >
          {wide ? (
            <>
              <ParallaxItem
                key="zigzag-heading"
                progress={progress}
                amplitude={amplitudes.heading}
                enabled={parallax}
                className="absolute w-[231px]"
                style={{ left: 62, top: 439.25 }}
              >
                {heading}
              </ParallaxItem>
              {STAGES.map((stage, i) => (
                <ParallaxItem
                  key={`zigzag-${stage.tag}`}
                  progress={progress}
                  amplitude={amplitudes.cards[i]}
                  enabled={parallax}
                  className="absolute w-[368px]"
                  style={STAGE_POSITIONS[i]}
                >
                  <StageCard stage={stage} />
                </ParallaxItem>
              ))}
            </>
          ) : (
            <div className="flex flex-col gap-4 pb-2 pt-10 md:gap-20">
              <ParallaxItem
                key="stacked-heading"
                progress={progress}
                amplitude={amplitudes.heading}
                enabled={parallax}
                className="max-w-[231px]"
              >
                {heading}
              </ParallaxItem>
              {STAGES.map((stage, i) => (
                <ParallaxItem
                  key={`stacked-${stage.tag}`}
                  progress={progress}
                  amplitude={amplitudes.cards[i]}
                  enabled={parallax}
                >
                  <StageCard stage={stage} />
                </ParallaxItem>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Investment --------------------------------- */

const INVESTMENT_ITEMS = [
  "Clear Page-Structure & DFY Copy",
  "Refreshed Visual Direction",
  "High-quality Design and Graphics",
  "Fully Responsive Framer or NextJs Build",
  "Regular updates on each stage",
];

function InvestmentSection() {
  const ref = useRef<HTMLElement>(null);
  const width = useElementWidth(ref);
  const row = width >= 900;

  return (
    <section
      ref={ref}
      className="mt-10 flex flex-col gap-5 border-t border-[#2f3641] bg-[#333b47] px-4 py-14 lg:px-9"
    >
      <h2 className="text-[20px] font-medium capitalize leading-[1.21] tracking-[-0.4px] text-white">
        [ Your investment ]
      </h2>

      <div className={row ? "flex items-start gap-[82px]" : "flex flex-col gap-8"}>
        <div
          className={`flex flex-col gap-3 ${row ? "w-[274px] shrink-0" : "max-w-[420px]"}`}
        >
          <h3
            className="animate-gradient-flow bg-clip-text text-[36.219px] font-medium capitalize leading-[1.2] tracking-[-1.4488px] text-transparent"
            style={{ backgroundImage: GRADIENT_BG }}
          >
            Homepage Sprint
          </h3>
          <p className="text-[12px] font-medium leading-[1.3] tracking-[-0.24px] text-[#949ca6]">
            A focused 3-week intensive to overhaul your visual identity, lock
            down your core business narrative, and deploy a world-class
            homepage that drives revenue.
          </p>
          <a
            href={MAILTO}
            className={`${CTA_INTERACTION} w-full rounded-[14px] px-3 py-1.5 text-center text-[12px] leading-4 tracking-[-0.24px]`}
          >
            Book A Call
          </a>
        </div>

        <div className={row ? "min-w-0 flex-1" : ""}>
          <Checklist label="What you’ll get:" items={INVESTMENT_ITEMS} />
        </div>

        <div
          className={`flex flex-col gap-2 border-t border-[#2f3641] pt-4 text-[14px] font-medium tracking-[-0.28px] ${row ? "min-w-0 flex-1" : ""}`}
        >
          <h3 className="leading-[1.1] text-[#949ca6]">Need more pages?</h3>
          <p className="leading-[1.6] text-white">
            We add additional pages as per your needs &amp; each page adds 3-4
            days into the sprint
          </p>
        </div>
      </div>
    </section>
  );
}
