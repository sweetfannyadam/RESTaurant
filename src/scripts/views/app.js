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

    content.innerHTML = await page.render();
    await page.afterRender();

    skipLink.addEventListener("click", (event) => {
      event.preventDefault();
      mainContent.focus();
    });
  },
};
