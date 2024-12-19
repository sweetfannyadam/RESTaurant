import * as idb from "../../data/idb";

/**
 * Update the favorite button UI based on the current favorite status.
 * @param {HTMLElement} button - The favorite button element.
 * @param {boolean} isFavorite - Boolean indicating whether the restaurant is marked as a favorite.
 */
export const updateFavoriteButton = (button, isFavorite) => {
  if (isFavorite) {
    button.textContent = "♥";
    button.classList.add("active");
    button.setAttribute("aria-label", "Remove from favorites");
  } else {
    button.textContent = "♡";
    button.classList.remove("active");
    button.setAttribute("aria-label", "Add to favorites");
  }
};

/**
 * Toggle the favorite status of a restaurant.
 * @param {Object} restaurant - The restaurant object.
 * @param {HTMLElement} button - The favorite button element.
 * @param {Function} updateUI - A callback function to update the button UI after the action.
 */
export const toggleFavorite = async (restaurant, button, updateUI) => {
  const restaurantId = restaurant.id;
  try {
    const isFavorite = await idb.getRestaurantById(restaurantId);

    if (isFavorite) {
      await idb.removeFavorite(restaurantId);
      updateUI(false);
      console.log(`Restaurant with ID ${restaurantId} removed from favorites`);
    } else {
      await idb.addFavorite(restaurant);
      updateUI(true);
      console.log(`Restaurant with ID ${restaurantId} added to favorites`);
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
  }

  const favoriteEvent = new CustomEvent("favorite-toggled", {
    detail: {
      restaurantId: restaurant.id,
      isFavorite: !isFavorite,
    },
    bubbles: true,
    composed: true,
  });
  button.dispatchEvent(favoriteEvent);
};

/**
 * Check if a restaurant is a favorite and return the status.
 * @param {string} restaurantId - The restaurant ID.
 * @returns {boolean} - Boolean indicating whether the restaurant is a favorite.
 */
export const checkIfFavorite = async (restaurantId) => {
  try {
    const isFavorite = await idb.checkFavorite(restaurantId);
    return isFavorite;
  } catch (error) {
    console.error("Error checking favorite:", error);
    return false;
  }
};
