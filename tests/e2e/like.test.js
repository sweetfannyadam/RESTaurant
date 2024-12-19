/* eslint-disable no-undef */
Feature("Liking Restaurant");

Scenario("test the favorites page", ({ I }) => {
  I.amOnPage("/#/favorite"); // Navigate to the favorites page
  I.see("You have no favorite restaurants yet.");
});

Scenario("liking a restaurant", async ({ I }) => {
  I.amOnPage("/"); // Navigate to the homepage

  // Wait for the restaurant list to load
  I.waitForElement("restaurant-card .favorite-button");

  // Click the favorite button for the first restaurant
  I.click("restaurant-card .favorite-button");

  // Check that the favorite button's text changes (from ♡ to ♥)
  I.seeElement(".favorite-button.active"); // Ensure the button is marked as active

  // Now, go to the favorites page and check if the restaurant appears
  I.amOnPage("/#/favorite");
  I.waitForElement("restaurant-card");
  I.seeElement("restaurant-card");
});

Scenario("disliking a restaurant", ({ I }) => {
  I.amOnPage("/"); // Navigate to the homepage

  // Wait for the restaurant list to load
  I.waitForElement("restaurant-card .favorite-button");

  // Click the first restaurant's favorite button
  I.click("restaurant-card .favorite-button");

  // Go to the favorites page and check if the restaurant appears
  I.amOnPage("/#/favorite");
  I.waitForElement("restaurant-card");
  I.seeElement("restaurant-card");

  // Now, go back to the homepage and click the favorite button again to remove
  I.amOnPage("/");
  I.waitForElement("restaurant-card .favorite-button");
  I.click("restaurant-card .favorite-button");

  // Go back to the favorites page and check if the restaurant is removed
  I.amOnPage("/#/favorite");
  I.dontSeeElement("restaurant-card"); // Ensure the restaurant is no longer in favorites
});
