export class NavLogo {
  private readonly navTitle: HTMLElement | undefined;
  private readonly splashSection: HTMLElement | undefined;

  constructor() {
    const navTitle = document.querySelector("#nav-title");
    const splash = document.querySelector("#section-splash");

    this.navTitle = navTitle instanceof HTMLElement ? navTitle : undefined;
    this.splashSection = splash instanceof HTMLElement ? splash : undefined;
  }

  init(): void {
    if (!this.navTitle || !this.splashSection) {
      console.error("Required navigation elements not found");
      return;
    }

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Initial call
    this.updateNavigation();

    // Update on scroll
    window.addEventListener("scroll", () => {
      this.updateNavigation();
    });
    window.addEventListener("resize", () => {
      this.updateNavigation();
    });
  }

  private updateNavigation(): void {
    // Logo visibility logic works on all screen sizes now
    const splashRect = this.splashSection!.getBoundingClientRect();
    // Show top nav logo when splash section is more than 20% scrolled out of view
    const isSplashVisible = splashRect.bottom > window.innerHeight * 0.2;

    if (isSplashVisible) {
      // Hide top nav logo
      this.navTitle!.classList.remove("visible");
    } else {
      // Show top nav logo
      this.navTitle!.classList.add("visible");
    }
  }
}
