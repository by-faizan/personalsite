import { defineField, defineType } from "sanity";

import { GalleryCardPreview } from "../components/GalleryCardPreview";

export const galleryProject = defineType({
  name: "galleryProject",
  title: "Gallery Project",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers show first",
      initialValue: 0,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Internal label / alt text — not shown on the card.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "backgroundColor",
      title: "Card background color",
      type: "color",
      description:
        "Shows behind the image. Matters most in Contain mode, or if the image has transparency.",
      options: { disableAlpha: true },
    }),
    defineField({
      name: "fit",
      title: "Fit",
      type: "string",
      description:
        "Cover fills the card edge-to-edge (crops to fit). Contain shows the full image, padded, on the background color — use this for product screenshots with their own background.",
      options: {
        list: [
          { title: "Cover (fill card)", value: "cover" },
          { title: "Contain (padded, full image visible)", value: "contain" },
        ],
        layout: "radio",
      },
      initialValue: "cover",
    }),
    defineField({
      name: "imagePadding",
      title: "Image padding (%)",
      type: "number",
      description:
        "Only used in Contain mode — how much breathing room around the image. 0 = edge to edge, higher = smaller/more inset.",
      initialValue: 8,
      validation: (Rule) => Rule.min(0).max(35),
      hidden: ({ document }) => document?.fit !== "contain",
    }),
    defineField({
      name: "livePreview",
      title: "Preview",
      type: "string",
      components: { field: GalleryCardPreview },
    }),
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});
