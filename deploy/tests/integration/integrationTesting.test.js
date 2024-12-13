describe("RestaurantCard Integration Test", () => {
  let restaurantCard;

  beforeEach(() => {
    restaurantCard = document.createElement("restaurant-card");
    restaurantCard._restaurant = {
      id: "1",
      name: "Restaurant 1",
      pictureId: "example",
      city: "Test City",
      rating: 4.5,
    };
    document.body.appendChild(restaurantCard);
  });

  afterEach(() => {
    document.body.removeChild(restaurantCard);
  });

  it("should add a restaurant to favorites when the like button is clicked", async () => {
    spyOn(idb, "addFavorite").and.callThrough();
    spyOn(idb, "getRestaurantById").and.returnValue(Promise.resolve(null));

    const favoriteButton =
      restaurantCard.shadowRoot.querySelector(".favorite-button");
    favoriteButton.click();

    await expectAsync(idb.addFavorite).toHaveBeenCalledWith(
      restaurantCard._restaurant,
    );
    expect(favoriteButton.textContent).toBe("♥");
    expect(favoriteButton.classList.contains("active")).toBe(true);
  });

  it("should remove a restaurant from favorites when the unlike button is clicked", async () => {
    spyOn(idb, "getRestaurantById").and.returnValue(
      Promise.resolve(restaurantCard._restaurant),
    );
    spyOn(idb, "removeFavorite").and.callThrough();

    const favoriteButton =
      restaurantCard.shadowRoot.querySelector(".favorite-button");
    favoriteButton.click(); // Like
    favoriteButton.click(); // Unlike

    await expectAsync(idb.removeFavorite).toHaveBeenCalledWith("1");
    expect(favoriteButton.textContent).toBe("♡");
    expect(favoriteButton.classList.contains("active")).toBe(false);
  });
});
