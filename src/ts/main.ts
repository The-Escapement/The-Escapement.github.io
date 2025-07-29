import { MobileMenu } from './mobile.js';
import { EmailSubscription } from './email.js';
import { TeamsManager } from './team.js';

document.addEventListener("DOMContentLoaded", function () {
  // Initialize mobile menu
  const mobileMenu = new MobileMenu();

  // Initialize email subscription
  const emailSubscription = new EmailSubscription();

  // Initialize teams and partners
  const teamsManager = new TeamsManager();

  // Custom smooth scrolling for navigation links
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = (link as HTMLAnchorElement).getAttribute("href");
      if (!targetId) return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      // Close mobile menu if open
      if (mobileMenu.isOpen()) {
        mobileMenu.closeMobileMenu();
      }

      // Custom smooth scroll with easing
      smoothScrollTo(targetElement, 800); // 0.8 seconds duration
    });
  });

  // Custom smooth scroll function with easing
  function smoothScrollTo(target: Element, duration: number): void {
    const start = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + start;
    const distance = targetPosition - start;
    let startTime: number | null = null;

    function animation(currentTime: number): void {
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
    }

    requestAnimationFrame(animation);
  }

  // Desktop navigation dynamic behavior
  const navBrandTitle = document.getElementById("nav-brand-title");
  const desktopNavLinks = document.getElementById("nav-links");
  const splashSection = document.getElementById("splash");

  if (!navBrandTitle || !desktopNavLinks || !splashSection) {
    console.error("Required navigation elements not found");
    return;
  }

  function updateNavigation(): void {
    if (window.innerWidth >= 1024) {
      // 64rem = 1024px
      const splashRect = splashSection!.getBoundingClientRect();
      // Show brand title when splash section is more than 20% scrolled out of view
      const isSplashVisible = splashRect.bottom > window.innerHeight * 0.2;

      if (isSplashVisible) {
        // Hide brand title, keep navigation links visible
        navBrandTitle!.style.opacity = "0";
        navBrandTitle!.style.transform = "translateY(-20px)";
        desktopNavLinks!.style.transform = "translateY(0)";
      } else {
        // Show brand title, push navigation links down
        navBrandTitle!.style.opacity = "1";
        navBrandTitle!.style.transform = "translateY(0)";
        desktopNavLinks!.style.transform = "translateY(40px)";
      }
    }
  }

  // Initial call
  updateNavigation();

  // Update on scroll
  window.addEventListener("scroll", updateNavigation);
  window.addEventListener("resize", updateNavigation);
});
