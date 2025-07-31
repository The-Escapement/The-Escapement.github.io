import { EmailSubscription } from "./email.js";
import { NarrowMenu } from "./narrow.js";
import { WideNavigation } from "./navigation.js";
import { SmoothScroller } from "./scrolling.js";
import { TeamsManager } from "./team.js";

document.addEventListener("DOMContentLoaded", () => {
  const wideNav = new WideNavigation();
  const narrowMenu = new NarrowMenu();
  const smoothScroller = new SmoothScroller(narrowMenu);
  const teamsManager = new TeamsManager();
  const emailSubscription = new EmailSubscription();
});
