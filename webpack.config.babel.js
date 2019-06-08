import path from 'path'

import CleanWebpackPlugin from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default (env, argv) => {
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
          use: 'babel-loader',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        'sw.js',
        'manifest.json',
      ]),
      new HtmlWebpackPlugin({ template: 'index.html' }),
      new FriendlyErrorsWebpackPlugin(),
    ],
  }
}
