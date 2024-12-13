import * as idb from "../../data/idb";

class RestaurantDetail extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.isFavorite = false;
  }

  connectedCallback() {
    this.checkIsFavorite();
  }

  set restaurant(data) {
    this._restaurant = data;
    this.checkIsFavorite();
  }

  async checkIsFavorite() {
    try {
      this.isFavorite = await idb.checkFavorite(this._restaurant.id);
      console.log("isFavorite (after check): ", this.isFavorite);
      this.render();
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  }

  async render() {
    const {
      name,
      description,
      city,
      address,
      pictureId,
      rating,
      menus,
      customerReviews,
    } = this._restaurant;

    const imageUrl = `https://restaurant-api.dicoding.dev/images/large/${pictureId}`;

    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Arial', sans-serif;
          color: #333;
          line-height: 1.6;
        }

        .detail-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .back-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #605678;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          cursor: pointer;
          margin-bottom: 20px;
          transition: background-color 0.3s ease;
        }

        .back-button:hover {
          background-color: #3a7bc8;
        }

        h2 {
          font-size: 2em;
          margin-bottom: 15px;
          color: #2c3e50;
        }

        .restaurant-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .restaurant-info {
          margin-bottom: 20px;
        }

        .address {
          font-style: italic;
          color: #666;
        }

        .description {
          margin-bottom: 20px;
        }

        h3 {
          font-size: 1.4em;
          margin-top: 30px;
          margin-bottom: 15px;
          color: #2c3e50;
        }

        .menu-list {
          list-style-type: none;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
        }

        .menu-item {
          background-color: #f0f0f0;
          padding: 10px;
          border-radius: 4px;
          text-align: center;
        }

        .favorite-button {
          background-color: rgba(255, 255, 255, 0.8);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s ease;
          position: absolute;
          top: 20px;
          right: 20px;
        }

        .favorite-button:hover {
          background-color: rgba(255, 255, 255, 1);
        }

        .favorite-button.active {
          color: #ff4136;
        }
      </style>
  
      <div class="detail-container">
        <a href="#/" class="back-button">← Back to List</a>
        <h2>${name}</h2>
        <img class="restaurant-image" src="${imageUrl}" alt="${name}">
        <div class="restaurant-info">
          <p class="address"> 📍 ${address}, ${city}</p <p class="description">${description}</p>
        <button class="favorite-button ${this.isFavorite ? "active" : ""}">
          ${this.isFavorite ? "♥" : "♡"}
        </button>
        <h3>Menus</h3>
        <ul class="menu-list">
          ${menus.foods.map((food) => `<li class="menu-item">${food.name}</li>`).join("")}
        </ul>
        <h3>Customer Reviews</h3>
        <ul class="review-list">
          ${customerReviews.map((review) => `<li>${review.name}: ${review.review}</li>`).join("")}
        </ul>
      </div>
    `;

    this.shadow
      .querySelector(".favorite-button")
      .addEventListener("click", () => this.toggleFavorite());
  }

  async toggleFavorite() {
    try {
      if (this.isFavorite) {
        await idb.removeFavorite(this._restaurant.id);
        this.isFavorite = false;
      } else {
        await idb.addFavorite(this._restaurant);
        this.isFavorite = true;
      }
      console.log("isFavorite (after toggle): ", this.isFavorite);
      this.render();
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  }
}

customElements.define("restaurant-detail", RestaurantDetail);
