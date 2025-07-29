import { EmailSubscription } from "./email.js";
import { MobileMenu } from "./mobile.js";
import { DesktopNavigation } from "./navigation.js";
import { SmoothScroller } from "./scrolling.js";
import { TeamsManager } from "./team.js";

document.addEventListener("DOMContentLoaded", () => {
  const desktopNav = new DesktopNavigation();
  const mobileMenu = new MobileMenu();
  const smoothScroller = new SmoothScroller(mobileMenu);
  const teamsManager = new TeamsManager();
  const emailSubscription = new EmailSubscription();
});
