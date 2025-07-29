export class MobileMenu {
  private readonly mobileMenuButton: HTMLElement | undefined;
  private readonly mobileCloseButton: HTMLElement | undefined;
  private readonly mobileOverlay: HTMLElement | undefined;
  private readonly mobileLinks: NodeListOf<Element>;

  constructor() {
    const menuButton = document.getElementById("mobile-menu-button");
    const closeButton = document.getElementById("mobile-close-button");
    const overlay = document.getElementById("nav-mobile-overlay");

    this.mobileMenuButton = menuButton ?? undefined;
    this.mobileCloseButton = closeButton ?? undefined;
    this.mobileOverlay = overlay ?? undefined;
    this.mobileLinks = document.querySelectorAll(".nav-mobile-link");

    this.init();
  }

  public closeMobileMenu(): void {
    this.mobileOverlay!.classList.remove("active");
    this.mobileMenuButton!.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  public isOpen(): boolean {
    return this.mobileOverlay!.classList.contains("active");
  }

  private init(): void {
    if (
      !this.mobileMenuButton ||
      !this.mobileCloseButton ||
      !this.mobileOverlay
    ) {
      console.error("Required mobile menu elements not found");
      return;
    }

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Toggle mobile menu
    this.mobileMenuButton!.addEventListener("click", () => {
      if (this.mobileOverlay!.classList.contains("active")) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    });

    // Close mobile menu
    this.mobileCloseButton!.addEventListener("click", () => {
      this.closeMobileMenu();
    });

    // Close when clicking overlay
    this.mobileOverlay!.addEventListener("click", (e) => {
      if (e.target === this.mobileOverlay) {
        this.closeMobileMenu();
      }
    });

    // Close mobile menu when clicking on a link
    this.mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMobileMenu();
      });
    });
  }

  private openMobileMenu(): void {
    this.mobileOverlay!.classList.add("active");
    this.mobileMenuButton!.classList.add("active");
    document.body.classList.add("menu-open");
  }
}
