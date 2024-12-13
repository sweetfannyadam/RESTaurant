Feature("Liking and Unliking Restaurants");

Before(({ I }) => {
  I.amOnPage("/");
});

Scenario("Like a restaurant", ({ I }) => {
  I.see("Restaurants List");
  I.click(".restaurant-card:first-child .favorite-button");
  I.see("♥", ".restaurant-card:first-child .favorite-button");
});

Scenario("Unlike a restaurant", ({ I }) => {
  I.see("Restaurants List");
  I.click(".restaurant-card:first-child .favorite-button"); // Like first
  I.click(".restaurant-card:first-child .favorite-button"); // Unlike
  I.see("♡", ".restaurant-card:first-child .favorite-button");
});

// Additional scenario for edge case
Scenario("Like a restaurant that is already liked", ({ I }) => {
  I.see("Restaurants List");
  I.click(".restaurant-card:first-child .favorite-button"); // Like first
  I.click(".restaurant-card:first-child .favorite-button"); // Unlike
  I.click(".restaurant-card:first-child .favorite-button"); // Like again
  I.see("♥", ".restaurant-card:first-child .favorite-button");
});
