export class NarrowMenu {
  private readonly navButton: HTMLElement | undefined;
  private readonly navLinks: HTMLElement | undefined;

  constructor() {
    const menuButton = document.querySelector("#nav-button");
    const navLinks = document.querySelector("#nav-links");

    this.navButton = menuButton instanceof HTMLElement ? menuButton : undefined;
    this.navLinks = navLinks instanceof HTMLElement ? navLinks : undefined;
  }

  public closeMenu(): void {
    if (this.navButton && this.navLinks) {
      this.navButton.classList.remove("active");
      this.navLinks.classList.remove("active");
      document.body.classList.remove("menu-opened");
    }
  }

  public isOpen(): boolean {
    return this.navButton?.classList.contains("active") ?? false;
  }

  init(): void {
    if (!this.navButton || !this.navLinks) {
      console.error("Required navigation elements not found");
      return;
    }

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (!this.navButton || !this.navLinks) {
      return;
    }

    // Toggle mobile menu
    this.navButton.addEventListener("click", () => {
      if (this.navButton!.classList.contains("active")) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    });

    // Close when clicking outside the menu
    document.addEventListener("click", (event) => {
      if (
        this.isOpen() &&
        event.target instanceof Node &&
        !this.navLinks!.contains(event.target) &&
        !this.navButton!.contains(event.target)
      ) {
        this.closeMenu();
      }
    });

    // Close menu when clicking on a link
    const links = this.navLinks.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", () => {
        this.closeMenu();
      });
    }

    // Close menu on window resize to larger screens
    // Note: 768px is the new breakpoint for showing horizontal navigation
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        this.closeMenu();
      }
    });
  }

  private openMenu(): void {
    if (this.navButton && this.navLinks) {
      this.navButton.classList.add("active");
      this.navLinks.classList.add("active");
      document.body.classList.add("menu-opened");
    }
  }
}
