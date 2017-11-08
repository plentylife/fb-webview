path = require('path');

const SplitByPathPlugin = require('webpack-split-by-path');
const ExtractPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const time = new Date().getTime();

const babelLoaderConfiguration = {
  test: /\.(js|jsx|es6)$/,
  // Add every directory that needs to be compiled by Babel during the build
  // include: [
  //   __dirname + 'src',
  //   __dirname + 'node_modules/react-native'
  // ],
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // This aliases 'react-native' to 'react-native-web' and includes only
      // the modules needed by the app
      plugins: ['react-native-web/babel'],
      // The 'react-native' preset is recommended (or use your own .babelrc)
      presets: ["react-native"]
    }
  }
};

// This is needed for webpack to import static images in JavaScript files
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]'
    }
  }
};

module.exports = {
  entry: {
    fetch: "whatwg-fetch",
    poly: 'babel-polyfill',
    index: "./src/index.js",
  },
  output: {
    path: __dirname + "/webview/resources",
    filename: '[name].js',
    // filename: '[name]'+time+'.js',
  },
  module : {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration
    ]
  },
  plugins: [
    // anton dev
    // aTUejAIYVKl6uOU6203JDtlxOa0rtE3k8vYw_0TG8uc.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTUwODUyNTg1MywicGFnZV9pZCI6MTQyMDc0MTU0MTMwODE0NCwicHNpZCI6IjE3ODMxNDY2NzUwMzMxODMiLCJ0aHJlYWRfdHlwZSI6IlVTRVJfVE9fUEFHRSIsInRpZCI6IjE3ODMxNDY2NzUwMzMxODMifQ
    // andrey dev
    // r4JLrrEYvKn-1S_fEFmjqcTwr99YbrAYKYN92frktZw.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTUwODc3NTY1NSwicGFnZV9pZCI6MTQyMDc0MTU0MTMwODE0NCwicHNpZCI6IjEzMTQwNjcwNjIwNTQ0OTIiLCJ0aHJlYWRfdHlwZSI6IlVTRVJfVE9fVVNFUiIsInRpZCI6IjE0ODI4MDU5MTg0Njc0MDQifQ

    new UglifyJSPlugin(),
    // new ExtractPlugin("styles.css"),
    new webpack.DefinePlugin({
      // "process.env.PACK_TIME": JSON.stringify(time),
      "process.env.NODE_ENV": JSON.stringify('production'),
      // "dev.token": JSON.stringify('aTUejAIYVKl6uOU6203JDtlxOa0rtE3k8vYw_0TG8uc.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTUwODUyNTg1MywicGFnZV9pZCI6MTQyMDc0MTU0MTMwODE0NCwicHNpZCI6IjE3ODMxNDY2NzUwMzMxODMiLCJ0aHJlYWRfdHlwZSI6IlVTRVJfVE9fUEFHRSIsInRpZCI6IjE3ODMxNDY2NzUwMzMxODMifQ')
    }),
    new SplitByPathPlugin([
      { name: 'index', path: 'src/' },
      { name: 'vendor', path: path.join(__dirname, 'node_modules/')},
    ], {
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.web.js', '.es6'],
    alias: {
      'react-native': 'react-native-web',
    },
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
};
