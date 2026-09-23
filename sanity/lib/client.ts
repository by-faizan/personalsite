import { createClient } from "next-sanity";

import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Bypass Sanity's CDN cache so publishes show up immediately.
      useCdn: false,
    })
  : null;
