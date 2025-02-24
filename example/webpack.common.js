const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  target: "web",
  entry: "./src/example.js",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "example.css",
    }),
    new HtmlWebpackPlugin({
      template: "./template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "responsive-loader",
            options: {
              sizes: [1920, 767],
              quality: 85,
              placeholder: true,
              outputPath: "dist/images/",
              format: "webp",
              // If you want to enable sharp support:
              adapter: require("responsive-loader/sharp"),
              additionalPaths: [
                {
                  width: 0,
                  format: "webp",
                  quality: 85,
                  outputPath: "dist/images/",
                },
              ],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
};
