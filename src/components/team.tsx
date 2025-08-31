import { grid } from "./team.css.ts";
import config from "~config";

type TeamType = "core" | "partners";
type PerRow = 3 | 4;

type TeamProps = {
  teamType: TeamType;
  perRow: PerRow;
};

const { toBeAnnounced } = config.team;

export default function Team({ teamType, perRow }: TeamProps) {
  const handles = config.team[teamType];

  return (
    <grid-l
      className={grid}
      min={`calc(min(var(--measure), 100vw) / ${perRow} - var(--size-7))`}
      space="var(--size-7)"
    >
      {handles.map((handle, index) => {
        const announceNow = !toBeAnnounced.includes(handle);
        const captionText = announceNow ? `@${handle}` : "To Be Announced";

        return (
          <figure
            key={`${teamType}-${handle}-${index}`}
            className={`${announceNow ? "clickable" : ""}`}
            onClick={
              announceNow
                ? () => window.open(`https://instagram.com/${handle}`, "_blank")
                : undefined
            }
          >
            <img
              src={
                announceNow
                  ? `/images/team/${handle}.webp`
                  : `/images/team/unannounced.webp`
              }
              alt={captionText}
            />

            <figcaption>{captionText}</figcaption>
          </figure>
        );
      })}
    </grid-l>
  );
}
