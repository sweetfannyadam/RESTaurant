import "regenerator-runtime";
import CacheHelper from "./utils/cache-helper";

const assetsToCache = [
  "./",
  "./index.html",
  "./sw.bundle.js",
  "./app.webmanifest",
  "./app.bundle.js",
  "./main.css",
  "./public/images/heros/hero-image_2.jpg",
];

self.addEventListener("install", (event) => {
  console.log("Installing Service Worker ...");

  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener("activate", (event) => {
  console.log("Activating Service Worker ...");

  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
