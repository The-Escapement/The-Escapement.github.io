export class NarrowMenu {
  private readonly narrowMenuButton: HTMLElement | undefined;
  private readonly narrowCloseButton: HTMLElement | undefined;
  private readonly narrowOverlay: HTMLElement | undefined;
  private readonly narrowLinks: NodeListOf<Element>;

  constructor() {
    const menuButton = document.querySelector("#nav-narrow-button");
    const closeButton = document.querySelector("#nav-narrow-close");
    const overlay = document.querySelector("#nav-narrow-overlay");

    this.narrowMenuButton =
      menuButton instanceof HTMLElement ? menuButton : undefined;
    this.narrowCloseButton =
      closeButton instanceof HTMLElement ? closeButton : undefined;
    this.narrowOverlay = overlay instanceof HTMLElement ? overlay : undefined;
    this.narrowLinks = document.querySelectorAll(".nav-narrow-link");
  }

  public closeNarrowMenu(): void {
    if (this.narrowOverlay && this.narrowMenuButton) {
      this.narrowOverlay.classList.remove("active");
      this.narrowMenuButton.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  }

  public isOpen(): boolean {
    return this.narrowOverlay?.classList.contains("active") ?? false;
  }

  init(): void {
    if (
      !this.narrowMenuButton ||
      !this.narrowCloseButton ||
      !this.narrowOverlay
    ) {
      console.error("Required narrow menu elements not found");
      return;
    }

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (
      !this.narrowMenuButton ||
      !this.narrowCloseButton ||
      !this.narrowOverlay
    ) {
      return;
    }

    // Toggle narrow menu
    this.narrowMenuButton.addEventListener("click", () => {
      if (this.narrowOverlay!.classList.contains("active")) {
        this.closeNarrowMenu();
      } else {
        this.openNarrowMenu();
      }
    });

    // Close narrow menu
    this.narrowCloseButton.addEventListener("click", () => {
      this.closeNarrowMenu();
    });

    // Close when clicking overlay
    this.narrowOverlay.addEventListener("click", (event) => {
      if (event.target === this.narrowOverlay) {
        this.closeNarrowMenu();
      }
    });

    // Close narrow menu when clicking on a link
    for (const link of this.narrowLinks) {
      link.addEventListener("click", () => {
        this.closeNarrowMenu();
      });
    }
  }

  private openNarrowMenu(): void {
    if (this.narrowOverlay && this.narrowMenuButton) {
      this.narrowOverlay.classList.add("active");
      this.narrowMenuButton.classList.add("active");
      document.body.classList.add("menu-open");
    }
  }
}
