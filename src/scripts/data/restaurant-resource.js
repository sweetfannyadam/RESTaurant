import API_ENDPOINT from "../globals/api";

class RestaurantResources {
  static async restaurants() {
    try {
      const response = await fetch(API_ENDPOINT.LIST);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const restaurants = data.restaurants;

      return restaurants;
    } catch (error) {
      console.log("Error fetching restaurants:", error);
      return [];
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { restaurant } = await response.json();

      return restaurant;
    } catch (error) {
      console.log("Error fetching restaurant details: ", error);
      return null;
    }
  }
}

export default RestaurantResources;
