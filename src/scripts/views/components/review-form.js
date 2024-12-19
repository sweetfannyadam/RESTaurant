class ReviewForm extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Arial', sans-serif;
          color: #333;
          line-height: 1.6;
        }
        .review-form {
          display: flex;
          flex-direction: column;
          margin-top: 20px;
        }
        .review-name, .review-text {
          margin-bottom: 10px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .review-text {
          resize: vertical;
          min-height: 60px;
        }
        button {
          background-color: #605678;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #3a7bc8;
        }
      </style>
      <form class="review-form">
        <input type="text" class="review-name" placeholder="Your Name" required />
        <textarea class="review-text" placeholder="Your Review" required></textarea>
        <button type="submit">Submit Review</button>
      </form>
    `;

    this.shadow
      .querySelector(".review-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const name = this.shadow.querySelector(".review-name").value;
        const review = this.shadow.querySelector(".review-text").value;

        // Dispatch a custom event with the review data
        this.dispatchEvent(
          new CustomEvent("submit-review", {
            detail: { name, review },
            bubbles: true,
            composed: true,
          }),
        );

        this.shadow.querySelector(".review-form").reset(); // Reset the form after submission
      });
  }

  // Optionally, you can add a method to set the restaurant ID if needed
  set restaurantId(id) {
    this._restaurantId = id;
  }
}

customElements.define("review-form", ReviewForm);
