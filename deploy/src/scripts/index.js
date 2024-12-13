import "regenerator-runtime";
import "../styles/main.css";
import swRegister from "./utils/sw-register.js";
import { App } from "./views/app.js";

window.addEventListener("DOMContentLoaded", () => {
  App.init();
  swRegister();
});

window.addEventListener("hashchange", () => {
  App.init();
});
