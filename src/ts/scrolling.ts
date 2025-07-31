import { type NarrowMenu } from "./narrow.js";

export class SmoothScroller {
  private readonly scrollLinks: NodeListOf<Element>;

  constructor(private readonly narrowMenu: NarrowMenu) {
    this.scrollLinks = document.querySelectorAll('a[href^="#"]');
    this.init();
  }

  private init(): void {
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    for (const link of this.scrollLinks) {
      link.addEventListener("click", (event) => {
        event.preventDefault();

        const targetId =
          link instanceof HTMLAnchorElement ? link.getAttribute("href") : null;
        if (!targetId) {
          return;
        }

        const targetElement = document.querySelector(targetId);
        if (!targetElement) {
          return;
        }

        // Close narrow menu if open
        if (this.narrowMenu.isOpen()) {
          this.narrowMenu.closeNarrowMenu();
        }

        // Custom smooth scroll with easing
        this.smoothScrollTo(targetElement, 500); // 0.5 seconds duration
      });
    }
  }

  private smoothScrollTo(target: Element, duration: number): void {
    const start = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + start;
    const distance = targetPosition - start;
    let startTime: number | undefined;

    const animation = (currentTime: number): void => {
      startTime ??= currentTime;

      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function: easeInOutCubic
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - (-2 * progress + 2) ** 3 / 2;

      window.scrollTo(0, start + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }
}
