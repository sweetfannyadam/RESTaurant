const { merge } = require("webpack-merge");
const path = require("path");
const commonConfig = require("./webpack.common"); // Import directly

module.exports = merge(commonConfig, {
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "src"), // Note: Removed the leading slash
    compress: true,
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});
