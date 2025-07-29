export class EmailSubscription {
  private readonly subscriptionForm: HTMLFormElement | undefined;
  private fullNameInput: HTMLInputElement | undefined;
  private emailInput: HTMLInputElement | undefined;
  private submitButton: HTMLButtonElement | undefined;

  constructor() {
    const form = document.getElementById("subscription-form");
    if (form instanceof HTMLFormElement) {
      this.subscriptionForm = form;
      this.init();
    } else {
      console.error("Subscription form not found");
    }
  }

  private init(): void {
    if (!this.subscriptionForm) {
      console.error("Subscription form not found");
      return;
    }

    const fullNameElement = document.getElementById("full-name");
    const emailElement = document.getElementById("email");
    const submitElement = this.subscriptionForm.querySelector(".submit-button");

    if (fullNameElement instanceof HTMLInputElement) {
      this.fullNameInput = fullNameElement;
    }

    if (emailElement instanceof HTMLInputElement) {
      this.emailInput = emailElement;
    }

    if (submitElement instanceof HTMLButtonElement) {
      this.submitButton = submitElement;
    }

    if (!this.fullNameInput || !this.emailInput || !this.submitButton) {
      console.error("Required form elements not found");
      return;
    }

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.subscriptionForm!.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  private handleSubmit(): void {
    const fullName = this.fullNameInput!.value.trim();
    const email = this.emailInput!.value.trim();

    if (!fullName || !email) {
      console.error("Please fill in all fields");
      return;
    }

    // Disable submit button to prevent double submission
    this.submitButton!.disabled = true;
    this.submitButton!.textContent = "Sending...";

    // Create mailto link with subscription details
    const subject = "SUBSCRIBE";
    const body = `Name: ${fullName}\nEmail: ${email}\n\nPlease add me to your mailing list for updates about The Escapement.`;
    const mailtoLink = `mailto:info@theescapement.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Reset form and button after a short delay
    setTimeout(() => {
      this.subscriptionForm!.reset();
      this.submitButton!.disabled = false;
      this.submitButton!.textContent = "Subscribe";
    }, 1000);
  }
}
