export class MobileMenu {
  private readonly mobileMenuButton: HTMLElement | undefined;
  private readonly mobileCloseButton: HTMLElement | undefined;
  private readonly mobileOverlay: HTMLElement | undefined;
  private readonly mobileLinks: NodeListOf<Element>;

  constructor() {
    const menuButton = document.querySelector("#nav-narrow-button") as
      | HTMLElement
      | undefined;
    const closeButton = document.querySelector("#mobile-close-button") as
      | HTMLElement
      | undefined;
    const overlay = document.querySelector("#nav-mobile-overlay") as
      | HTMLElement
      | undefined;

    this.mobileMenuButton = menuButton;
    this.mobileCloseButton = closeButton;
    this.mobileOverlay = overlay;
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
    this.mobileOverlay!.addEventListener("click", (event) => {
      if (event.target === this.mobileOverlay) {
        this.closeMobileMenu();
      }
    });

    // Close mobile menu when clicking on a link
    for (const link of this.mobileLinks) {
      link.addEventListener("click", () => {
        this.closeMobileMenu();
      });
    }
  }

  private openMobileMenu(): void {
    this.mobileOverlay!.classList.add("active");
    this.mobileMenuButton!.classList.add("active");
    document.body.classList.add("menu-open");
  }
}
