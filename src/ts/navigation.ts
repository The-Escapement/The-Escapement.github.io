export class WideNavigation {
  private readonly navTopTitle: HTMLElement | undefined;
  private readonly splashSection: HTMLElement | undefined;

  constructor() {
    this.navTopTitle = document.querySelector("#nav-wide-title") as
      | HTMLElement
      | undefined;
    this.splashSection = document.querySelector("#section-splash") as
      | HTMLElement
      | undefined;

    this.init();
  }

  private init(): void {
    if (!this.navTopTitle || !this.splashSection) {
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
    if (window.innerWidth >= 1024) {
      // Wide navigation logic
      const splashRect = this.splashSection!.getBoundingClientRect();
      // Show top nav logo when splash section is more than 20% scrolled out of view
      const issplashVisible = splashRect.bottom > window.innerHeight * 0.2;

      if (issplashVisible) {
        // Hide top nav logo
        this.navTopTitle!.classList.remove("visible");
      } else {
        // Show top nav logo
        this.navTopTitle!.classList.add("visible");
      }
    }
  }
}
