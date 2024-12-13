import { routes } from "../routes/routes.js";
import UrlParser from "../routes/url-parser";
import { AppBar } from "./components/app-bar.js";
import { initNewsletter } from "./components/newsletter.js";
import { initHero } from "./components/hero.js";

const heroImagePath = "../../public/images/heros/hero-image_2.jpg";

export const App = {
  async init() {
    this.initAppShell();
    this._initPageLoad();
  },

  async initAppShell() {
    initNewsletter();
    initHero();
    await AppBar.render();
    await AppBar.afterRender();
  },

  async _initPageLoad() {
    const url = UrlParser.parseActiveUrlWithCombiner();

    const page = routes[url] || routes["/"];

    const content = document.querySelector("#maincontent");
    const skipLink = document.querySelector(".skip-link");
    const mainContent = document.querySelector("#maincontent");

    const loader = SkeletonLoader.createLoader();
    content.innerHTML = ""; // Clear previous content
    content.appendChild(loader); // Append the loader

    // Simulate loading time (you can remove this in production)
    setTimeout(async () => {
      content.innerHTML = await page.render();
      await page.afterRender();
      // Remove loader after content is loaded
      content.removeChild(loader);
    }, 2000); // Simulate a 2-second loading time

    skipLink.addEventListener("click", (event) => {
      event.preventDefault();
      mainContent.focus();
    });
  },
};
