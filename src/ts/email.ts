export class EmailSubscription {
  private subscriptionForm: HTMLFormElement | null = null;
  private fullNameInput: HTMLInputElement | null = null;
  private emailInput: HTMLInputElement | null = null;
  private submitButton: HTMLButtonElement | null = null;

  constructor() {
    this.subscriptionForm = document.getElementById(
      "subscription-form",
    ) as HTMLFormElement;
    this.init();
  }

  private init(): void {
    if (!this.subscriptionForm) {
      console.error("Subscription form not found");
      return;
    }

    this.fullNameInput = document.getElementById(
      "full-name",
    ) as HTMLInputElement;
    this.emailInput = document.getElementById("email") as HTMLInputElement;
    this.submitButton = this.subscriptionForm.querySelector(
      ".submit-button",
    ) as HTMLButtonElement;

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
      alert("Please fill in all fields");
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
