const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].js",
    publicPath: "/",
  },
  devtool: "inline-source-map",
  devServer: {
    open: true,
    compress: true,
    port: "auto",
    client: {
      logging: "none",
      progress: true,
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
              ],
              plugins: [require.resolve("react-refresh/babel")],
            },
          },
        ],
      },
    ],
  },
  plugins: [new ReactRefreshPlugin()],
});
