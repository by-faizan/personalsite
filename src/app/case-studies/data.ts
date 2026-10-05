export type CaseStudyDetail = {
  slug: string;
  name: string;
  tag: string;
  title: string;
  intro: string;
  timeline: string;
  result: string;
  testimonial: { quote: string[]; name: string; role: string };
};

// The full write-up is archived in /archive/case-study-full until it's ready.
export const CASE_STUDY_DETAILS: CaseStudyDetail[] = [
  {
    slug: "ormedo-tech",
    name: "Ormedo Tech",
    tag: "Overview",
    title:
      "Refreshed the Brand & Homepage for Ormedo tech to increase credibility in b2B space",
    intro:
      "This sprint focuses on solving core messaging, information architecture, and trust issues for a B2B AI sales product. By humanizing technology and clarifying the value proposition, the project transforms an unstructured page into an engaging product showcase with a personality",
    timeline: "12 Days",
    result: "Increased Credibility",
    testimonial: {
      quote: [
        "The theme color is nice gives that nice gentle product that can be targeted to B2B and consumers and also the small mascot is friendly",
        "You are also extremely quick and responsive and have great taste.",
      ],
      name: "Skander Karoui",
      role: "Founder @Ormedo",
    },
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDY_DETAILS.find((c) => c.slug === slug) ?? null;
}
