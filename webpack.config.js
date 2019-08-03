const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = (env, argv) => {
  const mode = argv && argv.mode || 'development'

  const stats = {
    hash: false,
    version: false,
    timings: false,
    children: false,
    errors: false,
    errorDetails: false,
    warnings: false,
    chunks: false,
    modules: false,
    reasons: false,
    source: false,
    publicPath: false,
  }

  return {
    mode,
    stats,
    devServer: { stats },
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: './index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      chunkFilename: '[name].[id].js',
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.jsx?/,
          use: 'eslint-loader',
        },
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: ['cache-loader', 'babel-loader'],
        },
        {
          test: /\.css$/,
          use: [
            mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
      ],
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin(['manifest.json']),
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({ template: 'index.html' }),
      new GenerateSW({
        swDest: 'sw.js',
      }),
    ],
  }
}
