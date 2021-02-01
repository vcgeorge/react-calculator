const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_module/,
        use: "babel-loader",
      },
      {
        test: /\.css?$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // sourceMap: true,
              importLoaders: 1,
              modules: {
                compileType: "module",
                mode: (resourcePath) => {
                  if (/pure.css$/i.test(resourcePath)) {
                    return "pure";
                  }
                  if (/global.css$/i.test(resourcePath)) {
                    return "global";
                  }
                  return "local";
                },
                exportGlobals: true,
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                localIdentContext: path.resolve(__dirname, "src"),
                localIdentHashPrefix: "my-custom-hash",
                exportLocalsConvention: "camelCase",
              },
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
    }),
  ],
};
