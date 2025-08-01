export class TeamsManager {
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

  constructor() {
    this.init();
  }

  private init(): void {
    this.createMedallions(this.teamHandles, "medallions-team");
    this.createMedallions(this.partnerHandles, "medallions-partners");
  }

  private createMedallions(handles: string[], containerId: string): void {
    const container = document.querySelector(`#${containerId}`);
    if (!container) {
      return;
    }

    for (const handle of handles) {
      const medallionWrapper = document.createElement("div");
      medallionWrapper.className = "medallion-wrapper clickable";

      const medallion = document.createElement("div");
      medallion.className = "medallion";

      const captionText = this.toBeAnnounced.includes(handle)
        ? "To Be Announced"
        : `@${handle}`;

      const img = document.createElement("img");
      img.src = `images/team/${handle}.jpg`;
      img.alt = captionText;

      // Handle image load error with fallback
      img.addEventListener("error", () => {
        medallion.innerHTML = `
          <div class="medallion-fallback">
            @${handle}
          </div>
        `;
      });

      const caption = document.createElement("div");
      caption.className = "medallion-caption";
      caption.textContent = captionText;

      // Make the entire wrapper clickable
      medallionWrapper.addEventListener("click", () => {
        window.open(`https://instagram.com/${handle}`, "_blank");
      });

      medallion.append(img);
      medallionWrapper.append(medallion);
      medallionWrapper.append(caption);
      container.append(medallionWrapper);
    }
  }
}
