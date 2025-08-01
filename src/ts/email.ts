export class EmailSubscription {
  private readonly subscriptionForm: HTMLFormElement | undefined;
  private fullNameInput: HTMLInputElement | undefined;
  private emailInput: HTMLInputElement | undefined;
  private submitButton: HTMLButtonElement | undefined;
  private fullNameError: HTMLElement | undefined;
  private emailError: HTMLElement | undefined;
  private isFormValid = false;
  private fullNameTouched = false;
  private emailTouched = false;

  constructor() {
    const form = document.querySelector("#subscription-form");
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

    const fullNameElement = document.querySelector("#full-name");
    const emailElement = document.querySelector("#email");
    const submitElement = this.subscriptionForm.querySelector(".submit-button");
    const fullNameErrorElement = document.querySelector("#full-name-error");
    const emailErrorElement = document.querySelector("#email-error");

    if (fullNameElement instanceof HTMLInputElement) {
      this.fullNameInput = fullNameElement;
    }

    if (emailElement instanceof HTMLInputElement) {
      this.emailInput = emailElement;
    }

    if (submitElement instanceof HTMLButtonElement) {
      this.submitButton = submitElement;
    }

    if (fullNameErrorElement instanceof HTMLElement) {
      this.fullNameError = fullNameErrorElement;
    }

    if (emailErrorElement instanceof HTMLElement) {
      this.emailError = emailErrorElement;
    }

    if (
      !this.fullNameInput ||
      !this.emailInput ||
      !this.submitButton ||
      !this.fullNameError ||
      !this.emailError
    ) {
      console.error("Required form elements not found");
      return;
    }

    this.setupEventListeners();
    this.updateButtonState();
  }

  private setupEventListeners(): void {
    this.subscriptionForm!.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleSubmit();
    });

    // Add real-time validation listeners
    this.fullNameInput!.addEventListener("input", () => {
      this.fullNameTouched ||= true;
      this.validateFullName();
      this.updateButtonState();
    });

    this.emailInput!.addEventListener("input", () => {
      this.emailTouched ||= true;
      this.validateEmail();
      this.updateButtonState();
    });

    // Add blur listeners for immediate feedback
    this.fullNameInput!.addEventListener("blur", () => {
      this.fullNameTouched ||= true;
      this.validateFullName();
    });

    this.emailInput!.addEventListener("blur", () => {
      this.emailTouched ||= true;
      this.validateEmail();
    });
  }

  private validateFullName(): boolean {
    const fullName = this.fullNameInput!.value.trim();
    const email = this.emailInput!.value.trim();
    const isValid = fullName.length > 0;
    const bothEmpty = fullName.length === 0 && email.length === 0;

    if (isValid) {
      this.fullNameInput!.classList.remove("error");
      this.fullNameError!.classList.remove("visible");
    } else if (this.fullNameTouched && !bothEmpty) {
      this.fullNameInput!.classList.add("error");
      this.fullNameError!.classList.add("visible");
    } else {
      // Remove validation feedback when both fields are empty
      this.fullNameInput!.classList.remove("error");
      this.fullNameError!.classList.remove("visible");
    }

    return isValid;
  }

  private validateEmail(): boolean {
    const email = this.emailInput!.value.trim();
    const fullName = this.fullNameInput!.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    const bothEmpty = fullName.length === 0 && email.length === 0;

    if (isValid) {
      this.emailInput!.classList.remove("error");
      this.emailError!.classList.remove("visible");
    } else if (this.emailTouched && !bothEmpty) {
      this.emailInput!.classList.add("error");
      this.emailError!.classList.add("visible");
    } else {
      // Remove validation feedback when both fields are empty
      this.emailInput!.classList.remove("error");
      this.emailError!.classList.remove("visible");
    }

    return isValid;
  }

  private updateButtonState(): void {
    const fullNameValid = this.validateFullName();
    const emailValid = this.validateEmail();

    this.isFormValid = fullNameValid && emailValid;

    if (this.isFormValid) {
      this.submitButton!.disabled = false;
    } else {
      this.submitButton!.disabled = true;
    }
  }

  private handleSubmit(): void {
    if (!this.isFormValid) {
      return;
    }

    const fullName = this.fullNameInput!.value.trim();
    const email = this.emailInput!.value.trim();

    // Disable submit button to prevent double submission
    this.submitButton!.disabled = true;
    this.submitButton!.textContent = "Sending...";

    // Create mailto link with subscription details
    const subject = "SUBSCRIBE";
    const body = `Name: ${fullName}\nEmail: ${email}\n\nPlease add me to your mailing list for updates about The Escapement.`;
    const mailtoLink = `mailto:info@theescapement.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open default email client
    globalThis.location.href = mailtoLink;

    // Reset form and button after a short delay
    setTimeout(() => {
      this.subscriptionForm!.reset();
      this.fullNameInput!.classList.remove("error");
      this.emailInput!.classList.remove("error");
      this.fullNameError!.classList.remove("visible");
      this.emailError!.classList.remove("visible");
      this.submitButton!.disabled = true;
      this.submitButton!.textContent = "Subscribe";
      this.isFormValid = false;
      this.fullNameTouched = false;
      this.emailTouched = false;
    }, 1000);
  }
}
