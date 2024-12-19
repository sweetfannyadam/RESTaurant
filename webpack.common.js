const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ImageminWebpackPlugin = require("imagemin-webpack-plugin").default;

const imageminMozjpeg = () => import("imagemin-mozjpeg");
const imageminPngquant = () => import("imagemin-pngquant");
const imageminWebp = () => import("imagemin-webp");

module.exports = {
  entry: {
    app: "./src/scripts/index.js",
    sw: "./src/scripts/sw.js",
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "/dist"),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.svg$/,
        use: "svg-inline-loader",
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "public/images/heros",
              publicPath: "public/images/heros",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "./src/templates/index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public"),
          to: path.resolve(__dirname, "dist/"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "./src/styles/main.css",
    }),
    new CleanWebpackPlugin(),
    new ImageminWebpackPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        imageminMozjpeg({ quality: 75 }),
        imageminPngquant({
          quality: [0.65, 0.9],
        }),
        imageminWebp({ quality: 75 }),
      ],
    }),
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
