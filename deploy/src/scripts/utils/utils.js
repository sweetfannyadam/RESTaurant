const setTabIndex = (elements, index) => {
  elements.forEach((element) => {
    element.setAttribute("tabindex", index);
  });
};

const setFocus = (elements) => {
  elements.forEach((element) => {
    element.focus();
  });
};

const toggleMobileTabIndex = (elements, index) => {
  setTabIndex(elements, index);
  setFocus(elements);

  if (index === "-1") {
    elements.forEach((element) => {
      element.setAttribute("aria-hidden", "true");
    });
  } else {
    elements.forEach((element) => {
      element.setAttribute("aria-hidden", "false");
    });
  }
};

const hamburgerButton = document.querySelector("#hamburgerButton");
const navigationDrawer = document.querySelector("#navigationDrawer");
const mainElement = document.querySelector("main");
const skipContent = document.querySelector(".skip-link");
const appBarTitle = document.querySelector(".app-bar__title");
const homeLink = document.querySelector(".home");
const favoriteLink = document.querySelector(".favorite");
const aboutLink = document.querySelector(".about");
const heroTitle = document.querySelector(".hero__title");
const heroDescription = document.querySelector(".hero__description");
const mainContentTitle = document.querySelector(".maincontent-title");
const newsletterTitle = document.querySelector(".newsletter__title");
const newsletterDescription = document.querySelector(
  ".newsletter__description"
);
const newsletterEmail = document.querySelector("#newsletter-email");
const newsletterButton = document.querySelector(".newsletter__button");
const footerText = document.querySelector(".footer__text");

let isMenuOpen = false;

homeLink?.addEventListener("click", () => {
  window.location.hash = "/";
});

favoriteLink?.addEventListener("click", () => {
  window.location.hash = "/favorite";
});

const widthResizer = () => {
  const width = window.innerWidth;
  console.log("width:", width);

  const elementsToToggle = [
    skipContent,
    appBarTitle,
    hamburgerButton,
    homeLink,
    favoriteLink,
    aboutLink,
    heroTitle,
    heroDescription,
    mainContentTitle,
    newsletterTitle,
    newsletterDescription,
    newsletterEmail,
    newsletterButton,
    footerText,
  ];

  if (width < 768) {
    console.log("width < 768");
    toggleMobileTabIndex(elementsToToggle, "-1");
  } else {
    console.log("width >= 768");
    toggleMobileTabIndex(elementsToToggle, "0");
  }
  return width;
};

// Getting the width of the browser on load
widthResizer();

// Getting the width of the browser whenever the screen resolution changes.
window.addEventListener("resize", widthResizer);

hamburgerButton.addEventListener("click", (e) => {
  isMenuOpen = !isMenuOpen; // Update the flag
  navigationDrawer.classList.toggle("open", isMenuOpen);
  console.log("Menu open:", isMenuOpen); // Debugging output

  // Focus on the first link if the menu opens
  if (isMenuOpen) {
    const links = navigationDrawer.querySelectorAll("a");
    links.forEach((link) => link.setAttribute("tabindex", "0"));
    links.forEach((link) => {
      link.setAttribute("aria-hidden", "false");
    });

    links[0]?.focus();

    document.addEventListener("click", closeMenuOnClickOutside);
    document.addEventListener("keydown", closeMenuOnEscape);
  } else {
    closeMenu();
  }

  e.stopPropagation();
});

const closeMenu = () => {
  isMenuOpen = false;
  navigationDrawer.classList.remove("open");
  hamburgerButton.setAttribute("aria-expanded", "false");

  const links = navigationDrawer.querySelectorAll("a");
  links.forEach((link) => link.removeAttribute("tabindex"));
  links.forEach((link) => {
    link.setAttribute("aria-hidden", "true");
  });

  document.removeEventListener("click", closeMenuOnClickOutside);
  document.removeEventListener("keydown", closeMenuOnEscape);
};

const closeMenuOnClickOutside = (e) => {
  if (!navigationDrawer.contains(e.target) && e.target !== hamburgerButton) {
    closeMenu();
  }
};

const closeMenuOnEscape = (e) => {
  if (e.key === "Escape") {
    closeMenu();
  }
};

navigationDrawer.addEventListener("click", (e) => {
  e.stopPropagation();
});

mainElement.addEventListener("click", (e) => {
  navigationDrawer.classList.remove("open");
  hamburgerButton.setAttribute("aria-expanded", "false");
  e.stopPropagation();
});

document.addEventListener("click", closeMenu);
