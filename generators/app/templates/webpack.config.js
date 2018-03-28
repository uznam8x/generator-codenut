const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');
module.exports = {
  entry: (() => glob.sync("./app/dev/javascript/*.js").reduce((prev, current, index, array) => {
    const name = /([\w\d_-]*)\.?[^\\\/]*$/i;
    prev[current.match(name)[1]] = current;
    return prev;
  }, {}))(),

  output: {
    filename: '[name].min.js',
  },

  cache: false,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use:[
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015'],
            },
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_module/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              outputStyle: 'compressed',
              includePaths: [
                path.resolve(__dirname, './node_modules/codenut-style/scss/')
              ]
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
    }),
  ],
};
