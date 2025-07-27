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

  // Desktop navigation dynamic behavior
  const navBrandTitle = document.getElementById("nav-brand-title");
  const navLinks = document.getElementById("nav-links");
  const splashSection = document.getElementById("splash");

  if (!navBrandTitle || !navLinks || !splashSection) {
    console.error("Required navigation elements not found");
    return;
  }

  function updateNavigation(): void {
    if (window.innerWidth >= 1024) {
      // 64rem = 1024px
      const splashRect = splashSection!.getBoundingClientRect();
      const isSplashVisible =
        splashRect.bottom > 0 && splashRect.top < window.innerHeight;

      if (isSplashVisible) {
        // Hide brand title, keep navigation links visible
        navBrandTitle!.style.opacity = "0";
        navBrandTitle!.style.transform = "translateY(-20px)";
        navLinks!.style.transform = "translateY(0)";
      } else {
        // Show brand title, push navigation links down
        navBrandTitle!.style.opacity = "1";
        navBrandTitle!.style.transform = "translateY(0)";
        navLinks!.style.transform = "translateY(40px)";
      }
    }
  }

  // Initial call
  updateNavigation();

  // Update on scroll
  window.addEventListener("scroll", updateNavigation);
  window.addEventListener("resize", updateNavigation);

  // Contact form functionality
  const subscriptionForm = document.getElementById("subscription-form") as HTMLFormElement;

  if (subscriptionForm) {
    subscriptionForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const fullNameInput = document.getElementById("full-name") as HTMLInputElement;
      const emailInput = document.getElementById("email") as HTMLInputElement;
      const submitButton = subscriptionForm.querySelector(".submit-button") as HTMLButtonElement;

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
});
