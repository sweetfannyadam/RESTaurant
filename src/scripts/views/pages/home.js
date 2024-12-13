import RestaurantResources from "../../data/restaurant-resource";
import "../components/restaurant-card.js";

export const HomePage = {
  async render() {
    console.log("render HomePage");
    return `
    <div class="restaurant-list">
    </div>

    <style>
    .restaurant-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
      gap: 16px; 
    }
    </style>
    `;
  },

  async afterRender() {
    const content = document.querySelector("#maincontent");
    const restaurantList = document.querySelector(".restaurant-list");

    if (!restaurantList) {
      console.error("Error: #restaurant-list not found.");
      return;
    }

    RestaurantResources.restaurants()
      .then((restaurants) => {
        restaurantList.innerHTML = "";

        restaurants.forEach((restaurant) => {
          const restaurantCard = document.createElement("restaurant-card");
          restaurantCard.restaurant = restaurant;

          restaurantList.appendChild(restaurantCard);
        });
        content.appendChild(restaurantList);
      })
      .catch((error) => {
        content.innerHTML = "Failed to load restaurants";
        console.error(error);
      });

    content.appendChild(restaurantList);
  },
};
