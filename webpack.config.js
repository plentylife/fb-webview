path = require('path')

const ExtractPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
      // cacheDirectory: true,
      // This aliases 'react-native' to 'react-native-web' and includes only
      // the modules needed by the app
      // plugins: ['react-native-web/babel'],
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
    index: "./src/index.js",
  },
  output: {
    path: __dirname + "/webview/resources",
    filename: '[name].js',
  },
  module : {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration
    ]
    // ,
    // loaders :[
    //   {
    //     test: /\.css$/,
    //     loader: "style-loader!css-loader"
    //     // loader: ExtractPlugin.extract('style-loader', 'css-loader')
    //   },
    //   {
    //     test: /\.(png|jpg|svg)$/,
    //     loaders: ['url', 'image-webpack']
    //   },
    //   {
    //     test: /\.mp3$/,
    //     loader: 'file-loader'
    //   }
    // ]
  },
  // plugins: [
  //   new UglifyJSPlugin(),
  //   new ExtractPlugin("styles.css"),
  // ],
  resolve: {
    extensions: ['.js', '.jsx', '.web.js', '.es6'],
    alias: {
      'react-native': 'react-native-web',
    }
  },
};
