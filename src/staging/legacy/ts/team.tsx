import { render } from "preact";

export class Team {
  private readonly teamHandles = [
    "watchanish",
    "rjbroer",
    // "wei_koh_revolution",
    "kingflum",
    "changingtimes001",
    "horoloupe",
    "waitlisted",
  ];

  private readonly toBeAnnounced = ["Perezscope"];

  private readonly partnerHandles = [
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
  ];

  init(): void {
    this.createMedallions(this.teamHandles, "medallions-team");
    this.createMedallions(this.partnerHandles, "medallions-partners");
  }

  private createMedallions(handles: string[], containerId: string): void {
    const container = document.querySelector(`#${containerId}`);
    if (!container) {
      return;
    }

    container.innerHTML = "";

    const medallions = handles.map((handle, index) => {
      const announceNow = !this.toBeAnnounced.includes(handle);
      const captionText = announceNow ? `@${handle}` : "To Be Announced";

      return (
        <figure
          key={`${containerId}-${handle}-${index}`}
          className={`medallion clickable ${announceNow ? "clickable" : ""}`}
          onClick={
            announceNow
              ? () => window.open(`https://instagram.com/${handle}`, "_blank")
              : undefined
          }
        >
          <img
            src={
              announceNow
                ? `/images/team/${handle}.jpg`
                : `/images/team/unannounced.jpg`
            }
            alt={captionText}
          />
          <figcaption>{captionText}</figcaption>
        </figure>
      );
    });

    render(medallions, container);
  }
}
