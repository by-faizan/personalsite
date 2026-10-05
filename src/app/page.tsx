import HomeClient from "./HomeClient";
import { DEFAULT_WHO_I_HELP } from "./shared";
import { getSiteSettings } from "../../sanity/lib/data";

// Fetched per request so edits published in Sanity show up immediately.
export const dynamic = "force-dynamic";

export default async function Page() {
  const settings = await getSiteSettings().catch(() => null);

  return (
    <HomeClient
      whoIHelp={{
        heading: settings?.whoIHelpHeading || DEFAULT_WHO_I_HELP.heading,
        audience: settings?.whoIHelpAudience || DEFAULT_WHO_I_HELP.audience,
        description:
          settings?.whoIHelpDescription || DEFAULT_WHO_I_HELP.description,
      }}
    />
  );
}
