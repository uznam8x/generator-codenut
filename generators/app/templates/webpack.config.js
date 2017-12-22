const webpack = require('webpack');
const path = require('path');
module.exports = {
  output: {
    path: root + '/app/prod/javascript/',
    filename: 'script.min.js',
  },
  cache: true,

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      }
      ,
      output: {
        comments: false,
      },
      sourceMap: false,
    }),
  ],
};
