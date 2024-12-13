import { getAllFavorites } from "../../data/idb";

export const FavoritesPage = {
  async render() {
    console.log("render FavoritePage");
    return `
      <section class="favoritesPage">
        <h2 class="content__heading">Favorite Restaurants</h2>
        <div id="favoriteRestaurantsContainer"></div>
        <div id="noFavoriteMessage" style="display: none">
          You have no favorite restaurants yet.
        </div>  
      </section>
    `;
  },

  async afterRender() {
    console.log("afterRender FavoritePage");

    const favoriteRestaurantsContainer = document.querySelector(
      "#favoriteRestaurantsContainer",
    );

    if (!favoriteRestaurantsContainer) {
      console.error("favoriteRestaurantsContainer not found");
    }

    const favorites = await getAllFavorites();
    console.log("favorites: ", favorites);

    if (favorites.length === 0) {
      document.querySelector("#noFavoriteMessage").style.display = "block";
    } else {
      document.querySelector("#noFavoriteMessage").style.display = "none";
    }

    try {
      favorites.forEach((restaurant) => {
        const card = document.createElement("restaurant-card");
        card.restaurant = restaurant;

        favoriteRestaurantsContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Error rendering favorite restaurants:", error);
    }
  },
};
