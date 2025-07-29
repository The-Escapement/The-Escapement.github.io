import { MobileMenu } from './mobile.js';
import { EmailSubscription } from './email.js';
import { TeamsManager } from './team.js';
import { SmoothScroller } from './scrolling.js';
import { DesktopNavigation } from './navigation.js';

document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = new MobileMenu();
  new EmailSubscription();
  new TeamsManager();
  new SmoothScroller(mobileMenu);
  new DesktopNavigation();
});
