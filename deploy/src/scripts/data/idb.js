import { openDB } from "idb";
import CONFIG from "../globals/config";

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(db) {
    db.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
  },
});

// Add a restaurant to the favorites store
async function addFavorite(restaurant) {
  const db = await dbPromise;
  const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
  try {
    // Check if the restaurant already exists
    const existingRestaurant = await tx.store.get(restaurant.id);
    if (existingRestaurant) {
      console.log(`Restaurant ${restaurant.name} is already in favorites.`);
      return; // Exit the function if it already exists
    }

    await tx.store.add(restaurant);
    await tx.done; // Wait for the transaction to complete
    console.log(`Restaurant ${restaurant.name} added to favorites`);
  } catch (error) {
    console.error("Error adding restaurant:", error);
  }
}

// Remove a restaurant from the favorites store
async function removeFavorite(restaurantId) {
  const db = await dbPromise;
  const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
  try {
    await tx.store.delete(restaurantId);
  } catch (error) {
    console.error("Error removing restaurant:", error);
  }
}

// Get a restaurant by its ID
async function getRestaurantById(restaurantId) {
  const db = await dbPromise;
  return db.get(OBJECT_STORE_NAME, restaurantId);
}

// Get all favorite restaurants
async function getAllFavorites() {
  const db = await dbPromise;
  return db.getAll(OBJECT_STORE_NAME);
}

async function checkFavorite(restaurantId) {
  const db = await dbPromise;
  const favorite = await db.get(OBJECT_STORE_NAME, restaurantId);
  return Boolean(favorite);
}

export {
  addFavorite,
  removeFavorite,
  getRestaurantById,
  getAllFavorites,
  checkFavorite,
};
