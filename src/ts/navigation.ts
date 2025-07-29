export class DesktopNavigation {
  private navBrandTitle: HTMLElement | null;
  private desktopNavLinks: HTMLElement | null;
  private splashSection: HTMLElement | null;

  constructor() {
    this.navBrandTitle = document.getElementById("nav-brand-title");
    this.desktopNavLinks = document.getElementById("nav-links");
    this.splashSection = document.getElementById("splash");

    this.init();
  }

  private init(): void {
    if (!this.navBrandTitle || !this.desktopNavLinks || !this.splashSection) {
      console.error("Required navigation elements not found");
      return;
    }

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Initial call
    this.updateNavigation();

    // Update on scroll
    window.addEventListener("scroll", () => this.updateNavigation());
    window.addEventListener("resize", () => this.updateNavigation());
  }

  private updateNavigation(): void {
    if (window.innerWidth >= 1024) {
      // 64rem = 1024px
      const splashRect = this.splashSection!.getBoundingClientRect();
      // Show brand title when splash section is more than 20% scrolled out of view
      const isSplashVisible = splashRect.bottom > window.innerHeight * 0.2;

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