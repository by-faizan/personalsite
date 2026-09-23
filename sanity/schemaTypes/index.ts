import type { SchemaTypeDefinition } from "sanity";

import { galleryProject } from "./galleryProject";
import { siteSettings } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [galleryProject, siteSettings],
};
