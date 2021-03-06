const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    host: "0.0.0.0",
    port: 8005,
    compress: true,
    publicPath: "/",
    historyApiFallback: {
      index: "/"
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    // new webpack.DefinePlugin({
    //   "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL || "hipbar-dev.com")
    // })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader",
        exclude: /node_modules/
      }
    ]
  }
})
