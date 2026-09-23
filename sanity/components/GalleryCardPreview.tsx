import { useFormValue } from "sanity";

import { urlFor } from "../lib/image";

type ImageValue = {
  asset?: { _ref?: string };
};

type ColorValue = {
  hex?: string;
};

export function GalleryCardPreview() {
  const image = useFormValue(["image"]) as ImageValue | undefined;
  const backgroundColor = useFormValue(["backgroundColor"]) as ColorValue | undefined;
  const fit = (useFormValue(["fit"]) as string) || "cover";
  const imagePadding = (useFormValue(["imagePadding"]) as number) ?? 8;

  const bg = backgroundColor?.hex || "#313844";
  const imageUrl = image?.asset?._ref ? urlFor(image as never).width(700).url() : undefined;

  return (
    <div style={{ maxWidth: 460 }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "934 / 664.826",
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {imageUrl ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              padding: fit === "contain" ? `${imagePadding}%` : 0,
              boxSizing: "border-box",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: fit === "contain" ? "contain" : "cover",
                display: "block",
              }}
            />
          </div>
        ) : (
          <span style={{ color: "#94a3b8", fontSize: 12 }}>
            Add an image above to see it here
          </span>
        )}
      </div>
      <p style={{ marginTop: 8, fontSize: 12, color: "#94a3b8" }}>
        Live preview — approximates how this card looks on the site (updates as
        you change the image, fit, padding, or background color).
      </p>
    </div>
  );
}
