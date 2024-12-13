Feature("Customer Reviews");

Before(({ I }) => {
  I.amOnPage("/#/restaurants"); // Navigate to the restaurants page
});

Scenario("adding a customer review", ({ I }) => {
  I.seeElement(".restaurant-item"); // Ensure there are restaurant items
  I.click(".restaurant-item:first-child"); // Click on the first restaurant
  I.fillField("#review-input", "Great food!"); // Fill in the review
  I.click("#submit-review"); // Submit the review
  I.see("Review submitted successfully", ".notification"); // Check for success message
  I.see("Great food!", ".review-item"); // Check if the review appears
});
