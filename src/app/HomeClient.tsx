"use client";

import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { DM_Mono } from "next/font/google";
import { useState } from "react";

const dmMono = DM_Mono({ weight: "500", subsets: ["latin"] });

type Tab = "case-studies" | "design-gallery";

const TAB_ORDER: Tab[] = ["case-studies", "design-gallery"];

// Variant functions (not static objects) so exit reads the CURRENT direction
// at exit time, rather than the direction captured when it last rendered.
const tabSlideVariants: Variants = {
  enter: (dir: number) => ({ x: dir * 48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -48, opacity: 0 }),
};

export type ResolvedGalleryItem = {
  id: string;
  title: string;
  imageUrl?: string;
  fit: "cover" | "contain";
  bg: string;
  placeholder?: string;
  inset?: { x: string; y: string };
  imagePadding?: number;
};

export type SiteCopy = {
  heroHeadline: string;
  heroSubheadline: string;
  ctaLabel: string;
  whoIHelpHeading: string;
};

export default function HomeClient({
  galleryItems,
  copy,
}: {
  galleryItems: ResolvedGalleryItem[];
  copy: SiteCopy;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("case-studies");
  const [direction, setDirection] = useState(0);

  function switchTab(next: Tab) {
    setDirection(TAB_ORDER.indexOf(next) > TAB_ORDER.indexOf(activeTab) ? 1 : -1);
    setActiveTab(next);
  }

  return (
    <div
      className="flex min-h-screen w-full flex-col items-start bg-[#333b47] lg:h-screen lg:flex-row lg:overflow-hidden"
      data-node-id="0:275"
    >
      <div className="flex w-full shrink-0 flex-col overflow-hidden lg:h-full lg:w-[458px]">
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

              <div className="flex flex-col items-start justify-center gap-3">
                <h1 className="w-full max-w-[407px] text-[24px] font-medium leading-[1.1] tracking-[-1.4px] text-white lg:text-[28px]">
                  {copy.heroHeadline}
                </h1>
                <p className="w-full max-w-[359px] text-sm font-medium leading-[1.5] tracking-[-0.28px] text-[#949ca6]">
                  {copy.heroSubheadline}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <a
                href="mailto:faizanmotionss@gmail.com?subject=Marketing%20website%20inquiry"
                className="cursor-pointer select-none rounded-[18px] bg-[#2a7bf4] px-4 py-2 text-sm font-medium leading-5 tracking-[-0.28px] text-white transition-[background-color,transform] duration-200 ease-out hover:scale-[1.03] hover:bg-[#428af5] active:scale-[0.97] active:bg-[#0d69f2]"
              >
                {copy.ctaLabel}
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start justify-end pt-4">
            <div className="flex flex-col items-start gap-2 pt-4 text-sm tracking-[-0.28px]">
              <h2 className="font-semibold leading-[1.5] text-[#949ca6]">
                {copy.whoIHelpHeading}
              </h2>
              <div className="flex flex-col items-start gap-1 font-medium text-white">
                <p className="leading-[1.5]">
                  Early-Stage SaaS &amp; AI Startups
                </p>
                <p className="leading-[1.5]">
                  Design Studios{" "}
                  <span className="text-[#949ca6]">
                    [On contract/Project Basis]
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <SiteFooter className="hidden lg:flex" />
      </div>

      <div className="relative min-h-[560px] w-full flex-1 overflow-y-auto bg-[#22272f] lg:h-full">
        <div className="sticky top-0 z-10 flex justify-center bg-[#22272f]/80 pb-1 pt-9 backdrop-blur-sm">
          <div className="flex items-center gap-1 rounded-full bg-[#333b47] p-1">
            <TabButton
              label="Case Studies"
              active={activeTab === "case-studies"}
              onClick={() => switchTab("case-studies")}
            />
            <TabButton
              label="Design Gallery"
              active={activeTab === "design-gallery"}
              onClick={() => switchTab("design-gallery")}
            />
          </div>
        </div>

        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={tabSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          >
            {activeTab === "case-studies" ? (
              <CaseStudies />
            ) : (
              <DesignGallery items={galleryItems} />
            )}
          </motion.div>
        </AnimatePresence>
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

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative cursor-pointer select-none whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium leading-5 tracking-[-0.28px] transition-colors ${
        active ? "text-[#333b47]" : "text-[#bfc4cc] hover:bg-[#404a59]"
      }`}
    >
      {active && (
        <motion.span
          layoutId="active-tab-pill"
          className="absolute inset-0 rounded-full bg-[#dde0e4]"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}

type CaseStudyItem = {
  tag: string;
  heading: string;
  linkLabel: string;
  testimonial?: {
    quote: string;
    avatarSrc: string;
    name: string;
    role: string;
  };
  description?: string;
};

const CASE_STUDIES: CaseStudyItem[] = [
  {
    tag: "/01",
    heading: "Refreshed the brand and Redesigned the homepage for ormedo tech",
    linkLabel: "Full Case Study (coming soon)",
    testimonial: {
      quote:
        "Faizan is extremely quick and responsive and has great taste. He's also fast at incorporating feedback!",
      avatarSrc: "/testimonial-avatar.png",
      name: "Skander Karoui",
      role: "Founder @Ormedo",
    },
  },
  {
    tag: "/01",
    heading: "Designed the homepage for Flowpilot",
    linkLabel: "Full Case Study (coming soon)",
    description:
      "This homepage design is for a non-existing tech startup named FlowPilot which automates time consuming tasks for RevOp Teams",
  },
];

function CaseStudies() {
  return (
    <div className="px-4 pb-16 pt-4 lg:px-[73px]">
      <div className="mx-auto flex w-full max-w-[836px] flex-col gap-4">
        {CASE_STUDIES.map((item, i) => (
          <CaseStudyCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

function CaseStudyCard({ item }: { item: CaseStudyItem }) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl lg:h-[358px] lg:flex-row">
      <div className="relative flex aspect-[475/358] w-full shrink-0 items-center justify-center bg-[#313844] lg:h-full lg:w-[475px]">
        <p
          className={`${dmMono.className} px-4 text-center text-[29.875px] uppercase leading-[1.1] tracking-[-0.6px] text-white`}
        >
          [Coming Soon]
        </p>
      </div>
      <div className="flex w-full flex-1 flex-col gap-8 bg-[#272c35] p-6">
        <div className="flex w-full flex-col items-start gap-3">
          <div className="flex shrink-0 items-center justify-center rounded-[14px] border border-white px-2 py-1">
            <p className="text-[10px] font-semibold leading-[1.2] text-white">
              {item.tag}
            </p>
          </div>
          <h2 className="w-full text-[20px] font-medium capitalize leading-[1.1] tracking-[-0.48px] text-white lg:text-[24px]">
            {item.heading}
          </h2>
        </div>

        <div className="flex w-full items-start">
          <a
            href="#"
            className="flex shrink-0 select-none items-center justify-center gap-1 py-1.5 pr-2"
          >
            <span
              className="bg-clip-text text-xs font-medium leading-4 tracking-[-0.24px] text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgb(207, 250, 157) 0%, rgb(255, 199, 200) 52.404%, rgb(157, 194, 250) 100%)",
              }}
            >
              {item.linkLabel}
            </span>
            <Image src="/arrow.svg" alt="" width={14} height={14} />
          </a>
        </div>

        {item.testimonial ? (
          <div className="flex w-full flex-col items-start gap-4">
            <p className="w-full text-sm font-medium leading-[1.4] tracking-[-0.28px] text-white">
              &ldquo;{item.testimonial.quote}&rdquo;
            </p>
            <div className="flex w-full items-end gap-2">
              <Image
                src={item.testimonial.avatarSrc}
                alt={item.testimonial.name}
                width={30}
                height={30}
                className="shrink-0 rounded-[8px]"
              />
              <div className="flex h-full flex-col items-start justify-between text-xs tracking-[-0.24px]">
                <p className="font-semibold leading-none text-white">
                  {item.testimonial.name}
                </p>
                <p className="w-[102px] font-medium leading-[1.5] text-[#949ca6]">
                  {item.testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ) : item.description ? (
          <div className="flex w-full flex-1 flex-col items-start justify-end">
            <p className="w-full text-sm font-medium leading-[1.4] tracking-[-0.28px] text-white">
              {item.description}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function DesignGallery({ items }: { items: ResolvedGalleryItem[] }) {
  return (
    <div className="px-4 pb-9 pt-4 lg:px-6">
      <div className="mx-auto flex w-full max-w-[934px] flex-col items-center gap-[12px]">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative flex aspect-[934/664.826] w-full shrink-0 items-center justify-center overflow-hidden rounded-[16.64px]"
            style={{ backgroundColor: item.bg }}
          >
            {item.imageUrl ? (
              <div
                className="relative size-full"
                style={
                  item.inset
                    ? { padding: `${item.inset.y} ${item.inset.x}` }
                    : item.fit === "contain"
                      ? { padding: `${item.imagePadding ?? 8}%` }
                      : undefined
                }
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 934px, 100vw"
                  className={item.fit === "contain" ? "object-contain" : "object-cover"}
                />
              </div>
            ) : item.placeholder ? (
              <p
                className={`${dmMono.className} px-4 text-center text-[32px] uppercase leading-[1.1] tracking-[-0.6px] text-white sm:text-[54.24px]`}
              >
                {item.placeholder}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
