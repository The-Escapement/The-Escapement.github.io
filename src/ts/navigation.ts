export class DesktopNavigation {
  private readonly navTopTitle: HTMLElement | undefined;
  private readonly heroSection: HTMLElement | undefined;

  constructor() {
    this.navTopTitle = document.querySelector("#nav-wide-title") as
      | HTMLElement
      | undefined;
    this.heroSection = document.querySelector("#hero") as
      | HTMLElement
      | undefined;

    this.init();
  }

  private init(): void {
    if (!this.navTopTitle || !this.heroSection) {
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
      const heroRect = this.heroSection!.getBoundingClientRect();
      // Show top nav logo when hero section is more than 20% scrolled out of view
      const isheroVisible = heroRect.bottom > window.innerHeight * 0.2;

      if (isheroVisible) {
        // Hide top nav logo
        this.navTopTitle!.classList.remove("visible");
      } else {
        // Show top nav logo
        this.navTopTitle!.classList.add("visible");
      }
    }
  }
}
