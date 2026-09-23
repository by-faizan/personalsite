import { getGalleryProjects, getSiteSettings } from "../../sanity/lib/data";
import { urlFor } from "../../sanity/lib/image";
import HomeClient, { type ResolvedGalleryItem } from "./HomeClient";

// Always fetch fresh from Sanity — don't cache this route.
export const dynamic = "force-dynamic";

const DEFAULT_COPY = {
  heroHeadline:
    "An independent web designer creating marketing websites for early-stage startups",
  heroSubheadline:
    "I refresh your visual direction, write clear copy & design homepage within 2-3 weeks so you can become credible",
  ctaLabel: "Book A Call",
  whoIHelpHeading: "Who I help?",
};

const FALLBACK_GALLERY_ITEMS: ResolvedGalleryItem[] = [
  { id: "1", title: "", imageUrl: "/gallery/desktop-11.png", fit: "cover", bg: "#313844" },
  { id: "2", title: "", imageUrl: "/gallery/desktop-8.png", fit: "cover", bg: "#313844" },
  {
    id: "3",
    title: "",
    imageUrl: "/gallery/frame-1321317502.png",
    fit: "contain",
    bg: "#f9fafb",
    inset: { x: "7.9%", y: "12.3%" },
  },
  {
    id: "4",
    title: "",
    imageUrl: "/gallery/frame-1321317502-1.png",
    fit: "contain",
    bg: "#f0f2f5",
    inset: { x: "5.5%", y: "10.2%" },
  },
  { id: "5", title: "", imageUrl: "/gallery/desktop-7.png", fit: "cover", bg: "#313844" },
  { id: "6", title: "", bg: "#313844", fit: "cover", placeholder: "Curating more!" },
];

export default async function Page() {
  const [sanityItems, siteSettings] = await Promise.all([
    getGalleryProjects(),
    getSiteSettings(),
  ]);

  const galleryItems: ResolvedGalleryItem[] =
    sanityItems && sanityItems.length > 0
      ? sanityItems.map((item) => {
          const fit = item.fit ?? "cover";
          // "Cover" pre-crops to the card's aspect ratio server-side (smaller
          // download, exact fill). "Contain" must NOT be pre-cropped — the
          // full original image needs to reach the browser so object-contain
          // + padding can show all of it, same as the Studio preview does.
          const imageUrl = item.image
            ? fit === "cover"
              ? urlFor(item.image).width(1868).height(1330).url()
              : urlFor(item.image).width(1868).url()
            : undefined;

          return {
            id: item._id,
            title: item.title,
            imageUrl,
            fit,
            bg: item.backgroundColorHex || "#313844",
            imagePadding: item.imagePadding,
          };
        })
      : FALLBACK_GALLERY_ITEMS;

  const copy = {
    heroHeadline: siteSettings?.heroHeadline || DEFAULT_COPY.heroHeadline,
    heroSubheadline: siteSettings?.heroSubheadline || DEFAULT_COPY.heroSubheadline,
    ctaLabel: siteSettings?.ctaLabel || DEFAULT_COPY.ctaLabel,
    whoIHelpHeading: siteSettings?.whoIHelpHeading || DEFAULT_COPY.whoIHelpHeading,
  };

  return <HomeClient galleryItems={galleryItems} copy={copy} />;
}
