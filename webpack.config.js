const path = require("path");
const MediaQueryPlugin = require("media-query-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/*const CopyWebpackPlugin = require("copy-webpack-plugin");*/
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");

module.exports = [
  {
    entry: "./src/script/bundle.js",
    mode: "production",
    name: "public-cfg",
    output: {
      filename: "script/bundle.js",
      path: path.resolve(__dirname, "public"),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          use: ["babel-loader"],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            MediaQueryPlugin.loader,
          ],
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          loader: "image-webpack-loader",
          enforce: "pre",
        },
        {
          test: /\.(png|jpe?g|gif|avif)$/i,
          loader: "file-loader",
          options: {
            name: "/pic/[name].[ext]",
          },
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
          type: "asset/resource",
          generator: {
            filename: "fonts/[hash][ext][query]",
          },
        },
      ],
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin(), new HtmlMinimizerPlugin()],
      minimize: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/index.html",
      }),
      new MiniCssExtractPlugin({
        linkType: "text/css",
      }),
      new MediaQueryPlugin({
        include: ["style"],
        queries: {
          "screen and (min-width: 900px)": "desktop",
        },
      }),
    ],
  },
  {
    entry: "./src/script/bundle.js",
    mode: "development",
    name: "dev-cfg",
    output: {
      filename: "script/bundle.js",
      path: path.resolve(__dirname, "dev"),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          use: ["babel-loader"],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: "file-loader",
          options: {
            name: "/pic/[name].[ext]",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/index.html",
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, "dev"),
      },
      compress: false,
      open: "/",
      port: 8080,
    },
  },
];
