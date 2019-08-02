const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (_env, argv) => {
  const devMode = argv.mode !== 'production';

  return {
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      })
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [{
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
          },       
          {
            loader: "css-loader"
          }, {
            loader: "sass-loader",
          }]
        }
      ]
    },
    output: {
      filename: 'bundle.[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    },
  };
}