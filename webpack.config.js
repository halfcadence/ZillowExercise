const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (_env, argv) => {
  const devMode = argv.mode !== 'production';

  return {
    optimization: {
      minimizer: [
        new TerserPlugin(),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
          canPrint: true
        })
      ],
    },
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
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            'file-loader'
          ]
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1000000,
                fallback: 'file-loader',
              },
            },
          ],
        },
      ]
    },
    output: {
      filename: 'bundle.[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    },
  };
}