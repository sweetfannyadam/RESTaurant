Feature("Add Review Feature");

const restaurantId = "rqdv5juczeskfw1e867"; // Set the restaurant ID here

Scenario("User  can submit a review", async ({ I }) => {
  // Visit the restaurant detail page using the restaurant ID
  I.amOnPage(`http://localhost:8080/#/detail/${restaurantId}`);

  I.seeElement("restaurant-detail review-form"); // This will wait for the element to appear

  // Fill in the review form
  I.fillField("restaurant-detail review-form .review-name", "John Doe"); // Adjust the selector as needed
  I.fillField(
    "restaurant-detail review-form .review-text",
    "This restaurant is amazing!",
  );

  // Submit the review
  I.click('review-form button[type="submit"]'); // Adjust the selector as needed

  // Verify that the review was added to the list
  I.see("John Doe", ".review-list"); // Adjust the selector as needed
  I.see("This restaurant is amazing!", ".review-list"); // Adjust the selector as needed
});
