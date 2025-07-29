import { MobileMenu } from "./mobile.js";
import { EmailSubscription } from "./email.js";
import { TeamsManager } from "./team.js";
import { SmoothScroller } from "./scrolling.js";
import { DesktopNavigation } from "./navigation.js";

document.addEventListener("DOMContentLoaded", function () {
  new DesktopNavigation();
  const mobileMenu = new MobileMenu();
  new SmoothScroller(mobileMenu);
  new TeamsManager();
  new EmailSubscription();
});
