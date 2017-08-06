const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

// const extractSass = new ExtractTextPlugin({
//     filename: "client/scss/main.css",
//     disable: process.env.NODE_ENV === "development"
// });


module.exports = {
  devtool: debug ? 'inline-sourcemap' : true,
  entry: [
    'webpack-hot-middleware/client',
    './client/js/client.js'
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'react-hmre'],

        }

      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
        // use: extractSass.extract({
        //         use: [{
        //             loader: "css-loader"
        //         }, {
        //             loader: "sass-loader"
        //         }],
        //         // use style-loader in development
        //         fallback: "style-loader"
        //     })
      },
      { test: /\.css$/,
        // loaders: [
        //   'style-loader',
        //   'css-loader?importLoaders=1',
        //   'font-loader?format[]=truetype&format[]=woff&format[]=embedded-opentype'
        // ] },
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        }),
      },
      { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  output: {
    path: path.resolve('./client/dist'),
    filename: 'bundle.min.js',
    publicPath: '/dist/'
  },
  node: {
    net: 'empty',
    dns: 'empty',
    fs: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  plugins: [
    new ExtractTextPlugin("client/scss/main.css"),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Hammer: 'hammerjs/hammer'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ],
};
