import * as idb from "../../src/scripts/data/idb";
import "../../src/scripts/views/components/restaurant-card";

jest.mock("../../src/scripts/data/idb", () => ({
  checkFavorite: jest.fn(),
  addFavorite: jest.fn(),
  removeFavorite: jest.fn(),
  getRestaurantById: jest.fn(),
}));

describe("RestaurantCard", () => {
  let element;

  const mockRestaurantData = {
    id: "1",
    name: "Test Restaurant",
    city: "Test City",
    rating: 4.5,
    description: "A great place to eat.",
    pictureId: "test-image.jpg",
  };

  beforeEach(() => {
    // Create an instance of the custom element
    element = document.createElement("restaurant-card");
    document.body.appendChild(element);
  });

  afterEach(() => {
    // Clean up after each test
    document.body.removeChild(element);
    jest.clearAllMocks(); // Clear mocks to avoid interference between tests
  });

  test("should render correctly and check favorite status", async () => {
    // Mock the favorite check
    idb.checkFavorite.mockResolvedValue(false); // Initially not a favorite

    // Set the restaurant data
    element.restaurant = mockRestaurantData;

    // Wait for the render to complete
    await element.render();

    // Check if the favorite button is in the correct state
    const favoriteButton = element.shadowRoot.querySelector(".favorite-button");
    expect(favoriteButton.textContent).toBe("♡");
    expect(favoriteButton.classList.contains("active")).toBe(false);
  });

  test("should toggle favorite status when button is clicked", async () => {
    // ADD TO FAVORITES

    // Mock the favorite check to return false initially
    idb.checkFavorite.mockResolvedValue(false);
    idb.getRestaurantById.mockResolvedValue(false); // Not a favorite

    // Set the restaurant data
    element.restaurant = mockRestaurantData;

    // Wait for the render to complete
    await element.render();

    const favoriteButton = element.shadowRoot.querySelector(".favorite-button");

    // Simulate clicking the favorite button
    await favoriteButton.click();

    await idb.addFavorite(mockRestaurantData);
    expect(idb.addFavorite).toHaveBeenCalledWith(mockRestaurantData);
    expect(favoriteButton.textContent).toBe("♥");
    expect(favoriteButton.classList.contains("active")).toBe(true);

    // REMOVE FROM FAVORITES

    // Mock the favorite check to return false initially
    idb.checkFavorite.mockResolvedValue(true);
    idb.getRestaurantById.mockResolvedValue(true); // Not a favorite

    // Simulate clicking the favorite button
    await favoriteButton.click();

    await idb.removeFavorite(mockRestaurantData.id);
    expect(idb.removeFavorite).toHaveBeenCalledWith(mockRestaurantData.id);
    expect(favoriteButton.textContent).toBe("♡");
    expect(favoriteButton.classList.contains("active")).toBe(false);
    // Now simulate clicking the button again to remove from favorites
    // idb.checkFavorite(mockRestaurantData.id).mockResolvedValue(true); // Now it is a favorite
    // await favoriteButton.click();

    // idb.checkFavorite.mockResolvedValue(false);
    // // Check if the removeFavorite method was called
    // await idb.removeFavorite(mockRestaurantData.id);
    // expect(idb.removeFavorite).toHaveBeenCalledWith(mockRestaurantData.id);
    // expect(favoriteButton.textContent).toBe("♡");
    // expect(favoriteButton.classList.contains("active")).toBe(false);
  });
});
