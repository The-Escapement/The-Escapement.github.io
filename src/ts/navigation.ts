export class DesktopNavigation {
  private readonly navTopTitle: HTMLElement | undefined;
  private readonly navBrandTitle: HTMLElement | undefined;
  private readonly desktopNavLinks: HTMLElement | undefined;
  private readonly splashSection: HTMLElement | undefined;

  constructor() {
    this.navTopTitle = document.querySelector("#nav-top-title") as
      | HTMLElement
      | undefined;
    this.navBrandTitle = document.querySelector("#nav-brand-title") as
      | HTMLElement
      | undefined;
    this.desktopNavLinks = document.querySelector("#nav-links") as
      | HTMLElement
      | undefined;
    this.splashSection = document.querySelector("#splash") as
      | HTMLElement
      | undefined;

    this.init();
  }

  private init(): void {
    if (!this.navTopTitle || !this.navBrandTitle || !this.desktopNavLinks || !this.splashSection) {
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
      // Desktop navigation logic
      const splashRect = this.splashSection!.getBoundingClientRect();
      // Show top nav logo when splash section is more than 20% scrolled out of view
      const isSplashVisible = splashRect.bottom > window.innerHeight * 0.2;

      if (isSplashVisible) {
        // Hide top nav logo
        this.navTopTitle!.classList.remove("visible");
      } else {
        // Show top nav logo
        this.navTopTitle!.classList.add("visible");
      }

      // Mobile sidebar navigation logic (for reference, but hidden on desktop)
      if (isSplashVisible) {
        // Hide brand title, keep navigation links visible
        this.navBrandTitle!.classList.remove("visible");
        this.navBrandTitle!.classList.add("hidden");
        this.desktopNavLinks!.classList.remove("shifted");
      } else {
        // Show brand title, push navigation links down
        this.navBrandTitle!.classList.remove("hidden");
        this.navBrandTitle!.classList.add("visible");
        this.desktopNavLinks!.classList.add("shifted");
      }
    }
  }
}
