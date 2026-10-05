import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  description:
    "Only one of these should exist — it holds the main headline, subheadline, CTA button, and “Who I help?” heading shown on the homepage.",
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Headline (H1)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubheadline",
      title: "Subheadline",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA button text",
      type: "string",
      initialValue: "Book A Call",
    }),
    defineField({
      name: "whoIHelpHeading",
      title: "“Who I help?” heading (H2)",
      type: "string",
      initialValue: "Who I help?",
    }),
    defineField({
      name: "whoIHelpAudience",
      title: "Who I help — audience (white text)",
      description: "e.g. “Early-Stage SaaS & AI Startups”",
      type: "string",
      initialValue: "Early-Stage SaaS & AI Startups",
    }),
    defineField({
      name: "whoIHelpDescription",
      title: "Who I help — description (grey text)",
      description:
        "Continues the sentence after the audience, e.g. “who want to become more credible…”",
      type: "text",
      rows: 3,
      initialValue:
        "who want to become more credible and don\u2019t have 3 months to wait for their new direction & website",
    }),
  ],
  preview: {
    select: { title: "heroHeadline" },
  },
});
