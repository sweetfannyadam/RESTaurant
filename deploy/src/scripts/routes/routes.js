import { HomePage } from "../views/pages/home";
import { DetailPage } from "../views/pages/detail";
import { FavoritesPage } from "../views/pages/favorite";

export const routes = {
  "/": HomePage,

  "/detail/:id": DetailPage,

  "/favorite": FavoritesPage,
};
