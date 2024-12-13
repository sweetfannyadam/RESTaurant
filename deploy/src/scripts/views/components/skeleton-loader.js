// src/components/skeleton-loader.js
export const SkeletonLoader = {
  createLoader() {
    const loader = document.createElement("div");
    loader.classList.add("skeleton-loader");
    loader.innerHTML = `
      <div class="skeleton-title"></div>
      <div class="skeleton-content"></div>
      <div class="skeleton-content"></div>
    `;
    return loader;
  },
};
