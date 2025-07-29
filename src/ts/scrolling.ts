import { MobileMenu } from "./mobile";

export class SmoothScroller {
  private scrollLinks: NodeListOf<Element>;
  private mobileMenu: MobileMenu;

  constructor(mobileMenu: MobileMenu) {
    this.mobileMenu = mobileMenu;
    this.scrollLinks = document.querySelectorAll('a[href^="#"]');
    this.init();
  }

  private init(): void {
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.scrollLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = (link as HTMLAnchorElement).getAttribute("href");
        if (!targetId) return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        // Close mobile menu if open
        if (this.mobileMenu.isOpen()) {
          this.mobileMenu.closeMobileMenu();
        }

        // Custom smooth scroll with easing
        this.smoothScrollTo(targetElement, 800); // 0.8 seconds duration
      });
    });
  }

  private smoothScrollTo(target: Element, duration: number): void {
    const start = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + start;
    const distance = targetPosition - start;
    let startTime: number | null = null;

    const animation = (currentTime: number): void => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function: easeInOutCubic
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, start + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }
}
