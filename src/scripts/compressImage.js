const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");

(async () => {
  await imagemin(
    ["src/public/images/heros/*.{jpg,png}", "../dist/images/*.{jpg,png}"],
    {
      destination: "/public/images/heros",
      plugins: [
        imageminMozjpeg({ quality: 75 }),
        imageminPngquant({ quality: [0.6, 0.8] }),
      ],
    },
  );
  console.log("Images optimized!");
})();
