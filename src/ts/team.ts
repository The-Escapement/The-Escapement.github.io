export class TeamsManager {
  private teamHandles = [
    "watchanish",
    "rjbroer",
    "wei_koh_revolution",
    "kingflum",
    "changingtimes001",
    "horoloupe",
    "waitlisted",
  ];

  private partnerHandles = [
    "andrew_morgan_watches",
    "arabwatchguide",
    "equationdutemps",
    "fumanku",
    "jacopo_corvo",
    "langepedia",
    "marc.gebauer",
    "nicoleonardvanderhorst",
    "nycwatchguy",
    "Perezscope",
    "s7ndro",
    "samuelnaldi",
    "Shani.watch",
    "silas.walton",
    "SwissWatchGang",
    "TheJourneGuy",
    "Tony_Traina",
    "unekual",
    "watchgirloffduty",
    "watchstorydxb",
    "watchthetime",
  ];

  constructor() {
    this.init();
  }

  private init(): void {
    this.createMedallions(this.teamHandles, "team-medallions");
    this.createMedallions(this.partnerHandles, "partners-medallions");
  }

  private createMedallions(handles: string[], containerId: string): void {
    const container = document.getElementById(containerId);
    if (!container) return;

    handles.forEach((handle) => {
      const medallionWrapper = document.createElement("div");
      medallionWrapper.className = "medallion-wrapper clickable";

      const medallion = document.createElement("div");
      medallion.className = "medallion";

      const img = document.createElement("img");
      img.src = `images/team/${handle}.jpg`;
      img.alt = `@${handle}`;

      // Handle image load error with fallback
      img.onerror = () => {
        medallion.innerHTML = `
          <div class="medallion-fallback">
            @${handle}
          </div>
        `;
      };

      const caption = document.createElement("div");
      caption.className = "medallion-caption";
      caption.textContent = `@${handle}`;

      // Make the entire wrapper clickable
      medallionWrapper.addEventListener("click", () => {
        window.open(`https://instagram.com/${handle}`, "_blank");
      });

      medallion.appendChild(img);
      medallionWrapper.appendChild(medallion);
      medallionWrapper.appendChild(caption);
      container.appendChild(medallionWrapper);
    });
  }
}