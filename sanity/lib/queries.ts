import { defineQuery } from "next-sanity";

export const GALLERY_PROJECTS_QUERY = defineQuery(
  `*[_type == "galleryProject"] | order(order asc){
    _id,
    title,
    image,
    fit,
    imagePadding,
    "backgroundColorHex": backgroundColor.hex
  }`
);

export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type == "siteSettings"][0]{
    heroHeadline,
    heroSubheadline,
    ctaLabel,
    whoIHelpHeading
  }`
);
