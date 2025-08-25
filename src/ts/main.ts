import { EmailSubscription } from "./email.js";
import { NarrowMenu } from "./narrow.js";
import { WideNavigation } from "./navigation.js";
import { SmoothScroller } from "./scrolling.js";
import { TeamsManager } from "./team.js";

document.addEventListener("DOMContentLoaded", () => {
  new WideNavigation().init();
  const narrowMenu = new NarrowMenu();
  narrowMenu.init();
  new SmoothScroller(narrowMenu).init();
  new TeamsManager().init();
  new EmailSubscription().init();
});
