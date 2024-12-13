import * as idb from "../../data/idb";

class RestaurantCard extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  set restaurant(data) {
    this._restaurant = data;
    this.render();
  }

  async render() {
    const { name, city, rating, description, pictureId, id } = this._restaurant;

    const imageUrl = `https://restaurant-api.dicoding.dev/images/medium/${pictureId}`;

    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Arial', sans-serif;
        }

        .card-item {
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }

        .card-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
        }

        .card-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .location { 
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: rgba(96, 86, 120, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8em;
        }

        .restaurant-info { 
          padding: 15px;
          text-align: left;
        }

        h3 {
          margin: 0 0 10px;
          font-size: 1.4em;
          color: #333;
        }


        .rating { 
          display: inline-block;
          background-color: #605678;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .description { 
          font-size: 0.9em;
          color: #555;
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .detail-link { 
          display: flex;
          background-color: #605678;
          color: white;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 4px;
          justify-self: flex-end;
          transition: background-color 0.3s ease;
        }

        .detail-link:hover {
          background-color: #4a4460;
        }

        .favorite-button {
          position: absolute;
          top: 10px;
          right: 10px;
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
        }

        .favorite-button:hover {
          background-color: rgba(255, 255, 255, 1);
        }

        .favorite-button.active {
          color: #ff4136;
        }
      </style>

      <div class="card-item" id="card-item-${id}">
        <img class="card-image" src="${imageUrl}" alt="${name}" loading="lazy">
        <button class="favorite-button" aria-label="Add to Favorite">♡</button>
        <p class="location">📍 ${city}</p>  <!-- Update 7 -->
        <div class="restaurant-info">
          <h3>${name}</h3>
          <p class="rating">⭐ ${rating}</p>
          <p class="description">${description}</p>
          <a href=#/detail/${id} class="detail-link">View Details</a>
        </div>
      </div>
  `;

    const favoriteButton = this.shadow.querySelector(".favorite-button");

    const isFavorite = await idb.checkFavorite(id);
    this.updateFavoriteButton(isFavorite); // Update the button based on the favorite status

    favoriteButton.addEventListener("click", () => {
      this.toggleFavorite();
      console.log("Favorite button clicked");
    });

    favoriteButton.addEventListener("click", () => {
      this.toggleFavorite();
      console.log("Favorite button clicked");
      idb.addFavorite(this._restaurant);
    });
  }

  updateFavoriteButton = (isFavorite) => {
    console.log("isFavorite: ", isFavorite);
    const favoriteButton = this.shadow.querySelector(".favorite-button");
    if (isFavorite) {
      favoriteButton.textContent = "♥";
      favoriteButton.classList.add("active");
      favoriteButton.setAttribute("aria-label", "Remove from favorites");
    } else {
      favoriteButton.textContent = "♡";
      favoriteButton.classList.remove("active");
      favoriteButton.setAttribute("aria-label", "Add to favorites");
    }
  };

  toggleFavorite = async () => {
    const restaurantId = this._restaurant.id;
    try {
      const isFavorite = await idb.getRestaurantById(restaurantId);

      if (isFavorite) {
        await idb.removeFavorite(restaurantId);
        console.log(
          `Restaurant with ID ${restaurantId} removed from favorites`,
        );
        this.updateFavoriteButton(false);

        if (window.location.hash === "#/favorite") {
          this.shadow.querySelector(".card-item").classList.add("fade-out");
          setTimeout(() => this.remove(), 500);
        }
      } else {
        await idb.addFavorite(this._restaurant);
        console.log(`Restaurant with ID ${restaurantId} added to favorites`);
        this.updateFavoriteButton(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }

    const favoriteEvent = new CustomEvent("favorite-toggled", {
      detail: {
        restaurantId: this._restaurant.id,
        isFavorite: this.isFavorite,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(favoriteEvent);
  };
}

customElements.define("restaurant-card", RestaurantCard);
