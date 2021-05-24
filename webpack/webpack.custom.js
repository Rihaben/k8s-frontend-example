const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ESLintPlugin = require('eslint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');

module.exports = (config) => {
  if (config.mode === 'development') {
    config.plugins.push(
      new ESLintPlugin({
        extensions: ['js', 'ts']
      }),
      new FriendlyErrorsWebpackPlugin(),
      new WebpackNotifierPlugin({
        title: 'k8s-Frontend',
        emoji: true,
        contentImage: path.resolve(__dirname, 'logo-k8s.png')
      })
    );
    if (!process.env.SFA_DISABLE_WEBPACK_LOGS) {
      config.plugins.push(
        new SimpleProgressWebpackPlugin({
          format: 'compact'
        })
      )
    }
  }

  if (config.mode === 'production') {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: '../stats.html',
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      })
    );
  }

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
      }
    }),
    new MergeJsonWebpackPlugin({
      output: {
        groupBy: [
          {
            pattern: './src/i18n/en/*.json',
            fileName: './i18n/en.json'
          },
          {
            pattern: './src/i18n/in/*.json',
            fileName: './i18n/in.json'
          }
        ]
      }
    })
  );

  config = merge(config);

  return config;
}
