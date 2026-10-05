import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GradientLink } from "../../HomeClient";
import { BeforePoints } from "../BeforePoints";
import { Icon } from "../Icons";
import { Reveal } from "../Reveal";
import { CTA_INTERACTION, MAILTO } from "../../shared";
import { CASE_STUDY_DETAILS, getCaseStudy } from "../data";

export function generateStaticParams() {
  return CASE_STUDY_DETAILS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = getCaseStudy(slug);
  if (!found) return {};
  return { title: `${found.study.name} — Case Study | Faizan` };
}

// Tiles cropped out of two tall mockup sheets (offsets mirror the Figma frame).
const GALLERY = [
  { sheet: 1, top: "0%" },
  { sheet: 1, top: "-85.08%" },
  { sheet: 1, top: "-170.26%" },
  { sheet: 2, top: "-0.03%" },
  { sheet: 2, top: "-100.8%" },
  { sheet: 2, top: "-173.38%" },
] as const;

const SHEETS = {
  1: {
    src: "/case-studies/ormedo/sheet-1.png",
    w: 1440,
    h: 2364,
    height: "270.25%",
    width: "100.07%",
  },
  2: {
    src: "/case-studies/ormedo/sheet-2.png",
    w: 2331,
    h: 4096,
    height: "273.4%",
    width: "100.04%",
  },
} as const;

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-h-[124px] flex-col justify-between gap-4 bg-[#333b47] p-5 lg:px-5 lg:py-5">
      <p className="text-[14px] font-medium leading-[1.1] tracking-[-0.28px] text-[#8d98a5]">
        {label}
      </p>
      <p className="text-[32px] font-semibold capitalize leading-[1.2] tracking-[-1.6px] lg:text-[36px] lg:tracking-[-1.8px]">
        {value}
      </p>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <p className="w-fit whitespace-nowrap rounded-[14px] border border-[#7d8ba1] px-1 py-0.5 text-[12px] font-medium leading-[1.3] tracking-[-0.12px] text-[#b5bdc9]">
      {children}
    </p>
  );
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const found = getCaseStudy(slug);
  if (!found) notFound();
  const { study, next } = found;
  const { details } = study;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#22272f] text-white">
      {/* Top bar: breadcrumbs + Book A Call */}
      <header className="sticky top-0 z-20 h-16 border-b border-[#4d5461] bg-[#333b47]">
        <div className="mx-auto flex w-full max-w-[1440px] h-full items-center justify-between gap-4 px-4 lg:px-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[14px] font-medium leading-[1.5] tracking-[-0.28px] text-[#949ca6]">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link
                  href="/"
                  className="hidden transition-colors hover:text-white sm:inline"
                >
                  Case Studies
                </Link>
              </li>
              <li aria-hidden className="hidden sm:block">
                /
              </li>
              <li aria-current="page" className="text-white">
                {study.name}
              </li>
            </ol>
          </nav>
          <a
            href={MAILTO}
            className={`${CTA_INTERACTION} shrink-0 rounded-[18px] px-4 py-2 text-sm leading-5 tracking-[-0.28px]`}
          >
            Book A Call
          </a>
        </div>
      </header>

      <main className="flex w-full flex-1 flex-col">
        {/* Overview */}
        <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 pb-16 pt-12 lg:px-20 lg:pt-24">
          <div className="flex max-w-[1024px] flex-col gap-3">
            <Tag>{study.tag}</Tag>
            <h1 className="text-[32px] font-semibold capitalize leading-[1.2] tracking-[-1.6px] text-white lg:text-[40px] lg:tracking-[-2px]">
              {study.title}
            </h1>
            <p className="max-w-[836px] text-[14px] font-medium leading-[1.5] tracking-[-0.28px] text-[#949ca6]">
              {study.intro}
            </p>
          </div>

          {details && (
            <div className="grid gap-3 lg:grid-cols-[828fr_408fr] lg:gap-6">
              <figure className="flex flex-col justify-center gap-8 bg-[#333b47] p-6 lg:row-span-3 lg:px-[84px] lg:py-[76px]">
                <blockquote className="flex flex-col gap-3 text-[18px] font-medium leading-[1.4] tracking-[-0.36px] lg:text-[22px] lg:tracking-[-0.44px]">
                  {details.testimonial.quote.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </blockquote>
                <figcaption className="flex items-end gap-3">
                  <Image
                    src="/case-studies/ormedo/skander.png"
                    alt={details.testimonial.name}
                    width={48}
                    height={48}
                    className="size-12 shrink-0"
                  />
                  <div className="flex flex-col gap-1 text-[16px] tracking-[-0.32px] lg:text-[19px]">
                    <p className="font-semibold leading-none">
                      {details.testimonial.name}
                    </p>
                    <p className="font-medium leading-[1.5] text-[#949ca6]">
                      {details.testimonial.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
              <StatBox label="Timeline" value={details.timeline} />
              <StatBox label="Result" value={details.result} />
              <a
                href="#about"
                className="group flex min-h-[124px] flex-col justify-between gap-4 bg-[#333b47] p-5 transition-colors hover:bg-[#3a4350] lg:px-5 lg:py-5"
              >
                <span className="text-[14px] font-medium leading-[1.1] tracking-[-0.28px] text-[#8d98a5]">
                  The full story
                </span>
                <span className="flex items-center justify-between gap-3 text-[28px] font-semibold capitalize leading-[1.2] tracking-[-1.4px] lg:text-[32px]">
                  Just read the case study
                  <span
                    aria-hidden
                    className="text-[#9dc2fa] transition-transform duration-200 group-hover:translate-y-1"
                  >
                    ↓
                  </span>
                </span>
              </a>
            </div>
          )}
        </section>

        {details && (
          <>
            {/* About */}
            <section
              id="about"
              className="mx-auto grid w-full max-w-[1440px] scroll-mt-20 gap-6 px-4 py-12 lg:grid-cols-2 lg:px-20 lg:py-24"
            >
              <div className="lg:pl-6">
                <Tag>About Project</Tag>
              </div>
              <div className="flex flex-col gap-8">
                <p className="pt-4 text-[16px] font-medium leading-[1.4] tracking-[-0.32px]">
                  {details.about}
                </p>
                {[
                  ["industry", details.industry],
                  ["Services", details.services],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-2 gap-4 border-t border-[#2f3641] pt-4 text-[14px] font-medium tracking-[-0.28px]"
                  >
                    <p className="leading-[1.1] text-[#8d98a5]">{label}</p>
                    <p className="leading-[1.4]">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Before — pins under the header while the next section slides over it */}
            <section className="mx-auto grid w-full lg:[@media(min-height:780px)]:sticky lg:[@media(min-height:780px)]:top-16 max-w-[1440px] gap-8 px-4 py-12 lg:grid-cols-[1fr_712px] lg:gap-10 lg:px-20 lg:py-20">
              <div className="flex flex-col gap-10 lg:gap-14 lg:pl-6">
                <Tag>Before</Tag>
                <BeforePoints problems={details.problems} coverId="insights" />
              </div>
              <div className="relative aspect-[710/505] w-full overflow-hidden bg-white">
                <Image
                  src="/case-studies/ormedo/before.png"
                  alt="Ormedo homepage before the refresh"
                  fill
                  sizes="(min-width: 1024px) 710px, 100vw"
                  className="object-cover object-top-left"
                />
              </div>
            </section>

            {/* What changed */}
            <section
              id="insights"
              className="relative z-10 w-full bg-[#2f3641] shadow-[0_-24px_48px_rgba(0,0,0,0.35)]"
            >
              <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-12 lg:px-[104px] lg:py-[72px]">
                <div className="flex items-center gap-2 text-[#9dc2fa]">
                  <Icon name="process" />
                  <h2 className="text-[14px] font-semibold uppercase leading-[1.5] tracking-[0.56px]">
                    My thinking process
                  </h2>
                </div>
                <div className="grid gap-8 lg:grid-cols-3 lg:gap-16">
                  {details.insights.map((i) => (
                    <div key={i.title} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-[#9dc2fa]">
                        <Icon name={i.icon} />
                        <h3 className="text-[16px] font-semibold leading-[1.5] tracking-[-0.32px]">
                          {i.title}
                        </h3>
                      </div>
                      <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.28px]">
                        {i.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* After */}
            <section className="relative z-10 w-full bg-[#22272f]">
              <Reveal className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-12 lg:px-10 lg:py-16">
                <div className="lg:pl-10">
                  <Tag>After</Tag>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:gap-x-10 lg:gap-y-8">
                  {GALLERY.map((tile, i) => {
                    const sheet = SHEETS[tile.sheet];
                    return (
                      <div
                        key={i}
                        className="relative aspect-[885/538] overflow-hidden bg-[#333b47]"
                      >
                        <Image
                          src={sheet.src}
                          alt=""
                          width={sheet.w}
                          height={sheet.h}
                          sizes="(min-width: 1024px) 700px, 100vw"
                          className="pointer-events-none absolute left-0 max-w-none"
                          style={{
                            top: tile.top,
                            height: sheet.height,
                            width: sheet.width,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </section>
          </>
        )}

        {/* Next case study + CTA */}
        <section className="relative z-10 mt-auto border-t border-[#4d5461] bg-[#2f3641]">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-10 sm:flex-row sm:items-end sm:justify-between lg:px-20 lg:py-14">
            <div className="flex flex-col gap-3">
              <p className="text-[14px] font-medium leading-[1.1] tracking-[-0.28px] text-[#949ca6]">
                Next case study
              </p>
              <Link
                href={`/case-studies/${next.slug}`}
                className="group text-[24px] font-semibold leading-[1.2] tracking-[-0.96px] text-white transition-colors hover:text-[#9dc2fa]"
              >
                {next.name}
              </Link>
              <GradientLink
                label="Read Full Case Study"
                href={`/case-studies/${next.slug}`}
              />
            </div>
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.28px] text-[#949ca6]">
                Want a refresh like this?
              </p>
              <a
                href={MAILTO}
                className={`${CTA_INTERACTION} rounded-[18px] px-4 py-2 text-sm leading-5 tracking-[-0.28px]`}
              >
                Book A Call
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
