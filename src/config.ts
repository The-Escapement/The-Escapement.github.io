import { match } from "ts-pattern";

export type Feature = "logos";
export type Mode = "development" | "staging" | "production";

export const mode: Mode = match(import.meta.env.MODE)
  .with("development", () => "development" as const)
  .with("dev", () => "development" as const)
  .with("production", () => "production" as const)
  .with("prod", () => "production" as const)
  .with("staging", () => "staging" as const)
  .otherwise(() => {
    throw new Error(`Invalid mode: ${import.meta.env.MODE}`);
  });

// DESIGN: features should only hide work from production.
export const features: Feature[] = match(mode)
  .with("development", () => ["logos" as const])
  .otherwise(() => []);

const config = {
  mode,
  features,
  subscribe: {
    service: "default_service",
    publicKey: "zmPgTLf8Ez28MtmHD",
    template: mode === "production" ? "template_44wj4bp" : "template_52c7x7l",
  },
  team: {
    core: [
      "watchanish",
      "rjbroer",
      // "wei_koh_revolution",
      "kingflum",
      "changingtimes001",
      "horoloupe",
      "waitlisted",
    ],
    partners: [
      // "Seddiqi",
      "TheJourneGuy",
      // "nicoleonardvanderhorst",
      "justinhast",
      "SwissWatchGang",
      "andrew_morgan_watches",
      "jacopo_corvo",
      "silas.walton",
      // "langepedia",
      "marc.gebauer",
      "Tony_Traina",
      "watchgirloffduty",
      "Perezscope",
      "s7ndro",
      "nycwatchguy",
      "fumanku",
      // "equationdutemps",
      "changingtimes001",
      "arabwatchguide",
      "unekual",
      "samuelnaldi",
      "Shani.watch",
      "watchstorydxb",
      "watchthetime",
    ],
    toBeAnnounced: ["Perezscope"] as string[],
  },
} as const;

export default config;
