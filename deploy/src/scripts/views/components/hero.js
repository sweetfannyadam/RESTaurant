import heroImagePath from "../../../public/images/heros/hero-image_2.jpg";
export const initHero = () => {
  console.log("initHero");

  const hero = document.querySelector(".hero");

  hero.innerHTML = `
    <picture>
      <source srcset=${heroImagePath} media="(min-width: 768px)">
      <source srcset=${heroImagePath} media="(min-width: 480px)"> 
    <img
        src=${heroImagePath}
        alt="Foods served on a table"
        class="hero-image"
      />
    </picture>
    <div class="hero__content">
      <h2 class="hero__title">Discover Culinary Delights Near You</h2>
      <p class="hero__description">
        Explore the best restaurants and their unique offerings in your area.
        Let us help you find your next great meal!
      </p>
    </div>
    `;
};
