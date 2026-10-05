import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTA_INTERACTION, MAILTO } from "../../shared";
import { CASE_STUDY_DETAILS, getCaseStudy } from "../data";

export function generateStaticParams() {
  return CASE_STUDY_DETAILS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return { title: `${study.name} — Case Study | Faizan` };
}

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
  const study = getCaseStudy(slug);
  if (!study) notFound();

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

          <div className="grid gap-3 lg:grid-cols-[828fr_408fr] lg:gap-6">
            <figure className="flex flex-col justify-center gap-8 bg-[#333b47] p-6 lg:row-span-3 lg:px-[84px] lg:py-[76px]">
              <blockquote className="flex flex-col gap-3 text-[18px] font-medium leading-[1.4] tracking-[-0.36px] lg:text-[22px] lg:tracking-[-0.44px]">
                {study.testimonial.quote.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </blockquote>
              <figcaption className="flex items-end gap-3">
                <Image
                  src="/case-studies/ormedo/skander.png"
                  alt={study.testimonial.name}
                  width={48}
                  height={48}
                  className="size-12 shrink-0"
                />
                <div className="flex flex-col gap-1 text-[16px] tracking-[-0.32px] lg:text-[19px]">
                  <p className="font-semibold leading-none">
                    {study.testimonial.name}
                  </p>
                  <p className="font-medium leading-[1.5] text-[#949ca6]">
                    {study.testimonial.role}
                  </p>
                </div>
              </figcaption>
            </figure>
            <StatBox label="Timeline" value={study.timeline} />
            <StatBox label="Result" value={study.result} />
            <div className="flex min-h-[124px] flex-col justify-between gap-4 bg-[#333b47] p-5 lg:px-5 lg:py-5">
              <span className="text-[14px] font-medium leading-[1.1] tracking-[-0.28px] text-[#8d98a5]">
                The full story
              </span>
              <span className="text-[28px] font-semibold capitalize leading-[1.2] tracking-[-1.4px] lg:text-[32px]">
                Full case study coming soon
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
