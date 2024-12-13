import "../components/restaurant-detail";
import RestaurantResources from "../../data/restaurant-resource";
import UrlParser from "../../routes/url-parser";

export const DetailPage = {
  async render() {
    console.log("render DetailPage");
    return `
    <div class="restaurant-detail">
      <restaurant-detail></restaurant-detail>
    </div>
    `;
  },

  async afterRender() {
    console.log("afterRender DetailPage");

    const { id } = UrlParser.parseActiveUrlWithoutCombiner();
    console.log("id: ", id);

    const content = document.querySelector("#maincontent");
    console.log("content: ", content);

    const restaurantDetail = document.createElement("restaurant-detail");
    console.log("restaurantDetail: ", restaurantDetail);

    restaurantDetail.setAttribute("restaurant-id", id);
    console.log("restaurantDetail: ", restaurantDetail);

    RestaurantResources.detailRestaurant(id)
      .then((restaurant) => {
        console.log("restaurant: ", restaurant);
        restaurantDetail.restaurant = restaurant;
        console.log("restaurantDetail: ", restaurant);
        content.innerHTML = "";
        content.appendChild(restaurantDetail);
      })
      .catch((error) => {
        content.innerHTML = "Failed to load restaurant details";
        console.error("Error fetching restaurant details:", error);
      });
  },
};
