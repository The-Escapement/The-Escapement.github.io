document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileCloseButton = document.getElementById("mobile-close-button");
  const mobileOverlay = document.getElementById("nav-mobile-overlay");
  const mobileLinks = document.querySelectorAll(".nav-mobile-link");

  if (!mobileMenuButton || !mobileCloseButton || !mobileOverlay) {
    console.error("Required mobile menu elements not found");
    return;
  }

  // Toggle mobile menu
  mobileMenuButton.addEventListener("click", function () {
    if (mobileOverlay!.classList.contains("active")) {
      closeMobileMenu();
    } else {
      mobileOverlay!.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });

  // Close mobile menu
  function closeMobileMenu(): void {
    mobileOverlay!.classList.remove("active");
    document.body.style.overflow = "";
  }

  mobileCloseButton.addEventListener("click", closeMobileMenu);
  mobileOverlay.addEventListener("click", function (e) {
    if (e.target === mobileOverlay) {
      closeMobileMenu();
    }
  });

  // Close mobile menu when clicking on a link
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

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
      if (mobileOverlay!.classList.contains("active")) {
        closeMobileMenu();
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

  // Contact form functionality
  const subscriptionForm = document.getElementById(
    "subscription-form",
  ) as HTMLFormElement;

  if (subscriptionForm) {
    subscriptionForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const fullNameInput = document.getElementById(
        "full-name",
      ) as HTMLInputElement;
      const emailInput = document.getElementById("email") as HTMLInputElement;
      const submitButton = subscriptionForm.querySelector(
        ".submit-button",
      ) as HTMLButtonElement;

      if (!fullNameInput || !emailInput || !submitButton) {
        console.error("Required form elements not found");
        return;
      }

      const fullName = fullNameInput.value.trim();
      const email = emailInput.value.trim();

      if (!fullName || !email) {
        alert("Please fill in all fields");
        return;
      }

      // Disable submit button to prevent double submission
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      // Create mailto link with subscription details
      const subject = "SUBSCRIBE";
      const body = `Name: ${fullName}\nEmail: ${email}\n\nPlease add me to your mailing list for updates about The Escapement.`;
      const mailtoLink = `mailto:info@theescapement.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open default email client
      window.location.href = mailtoLink;

      // Reset form and button after a short delay
      setTimeout(() => {
        subscriptionForm.reset();
        submitButton.disabled = false;
        submitButton.textContent = "Subscribe";
      }, 1000);
    });
  }

  // Team and Partners data
  const teamHandles = [
    "watchanish",
    "rjbroer",
    "wei_koh_revolution",
    "kingflum",
    "changingtimes001",
    "horoloupe",
    "waitlisted",
  ];

  const partnerHandles = [
    "andrew_morgan_watches",
    "arabwatchguide",
    "equationdutemps",
    "fumanku",
    "jacopo_corvo",
    "langepedia",
    "marc.gebauer",
    "nicoleonardvanderhorst",
    "nycwatchguy",
    "Perezscope",
    "s7ndro",
    "samuelnaldi",
    "Shani.watch",
    "silas.walton",
    "SwissWatchGang",
    "TheJourneGuy",
    "Tony_Traina",
    "unekual",
    "watchgirloffduty",
    "watchstorydxb",
    "watchthetime",
  ];

  // Create medallions
  function createMedallions(handles: string[], containerId: string): void {
    const container = document.getElementById(containerId);
    if (!container) return;

    handles.forEach((handle) => {
      const medallionWrapper = document.createElement("div");
      medallionWrapper.className = "medallion-wrapper";

      const medallion = document.createElement("div");
      medallion.className = "medallion";

      const img = document.createElement("img");
      img.src = `images/team/${handle}.jpg`;
      img.alt = `@${handle}`;

      // Handle image load error with fallback
      img.onerror = () => {
        medallion.innerHTML = `
          <div class="medallion-fallback">
            @${handle}
          </div>
        `;
      };

      const caption = document.createElement("div");
      caption.className = "medallion-caption";
      caption.textContent = `@${handle}`;

      // Make the entire wrapper clickable
      medallionWrapper.style.cursor = "pointer";
      medallionWrapper.addEventListener("click", () => {
        window.open(`https://instagram.com/${handle}`, "_blank");
      });

      medallion.appendChild(img);
      medallionWrapper.appendChild(medallion);
      medallionWrapper.appendChild(caption);
      container.appendChild(medallionWrapper);
    });
  }

  // Create medallions
  createMedallions(teamHandles, "team-medallions");
  createMedallions(partnerHandles, "partners-medallions");
});
