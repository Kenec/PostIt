const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: debug ? 'inline-sourcemap' : false,
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
      },
      { test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'font-loader?format[]=truetype' +
          '&format[]=woff&format[]=embedded-opentype'
        ],
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
    new ExtractTextPlugin('client/scss/main.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Hammer: 'hammerjs/hammer'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.UglifyJsPlugin(
    // //   // compress: {
    // //   //   // mangle: false,
    // //   //   // warnings: false,
    // //   //   // comments: false
    // //   // }
    // ),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV
    //   || 'development'),
    // }),
    // new webpack.EnvironmentPlugin([process.env.NODE_ENV
    // || 'development']),
  ],
};
