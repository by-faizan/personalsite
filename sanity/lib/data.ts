import type { SanityImageSource } from "@sanity/image-url";

import { client } from "./client";
import { GALLERY_PROJECTS_QUERY, SITE_SETTINGS_QUERY } from "./queries";

export type GalleryProject = {
  _id: string;
  title: string;
  image?: SanityImageSource;
  fit?: "cover" | "contain";
  imagePadding?: number;
  backgroundColorHex?: string;
};

export type SiteSettings = {
  heroHeadline?: string;
  heroSubheadline?: string;
  ctaLabel?: string;
  whoIHelpHeading?: string;
};

export async function getGalleryProjects(): Promise<GalleryProject[] | null> {
  if (!client) return null;
  return client.fetch(GALLERY_PROJECTS_QUERY, {}, { cache: "no-store" });
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!client) return null;
  return client.fetch(SITE_SETTINGS_QUERY, {}, { cache: "no-store" });
}
