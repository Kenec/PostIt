// define a variable debug only to be used when not in production environment
const debug = process.env.NODE_ENV !== 'production';
// import webpack module
const webpack = require('webpack');
// import path module and assign it to a variable path
const path = require('path');
// import node-env-file and assign to a variable env
const env = require('node-env-file');
// import extract-text-webpack-plugin and assign to variable ExtractTextPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// assign process.env.NODE_ENV to the current node environment
// or to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// call the .env file and pass it to the node-env-file function
// Surround with try catch block so that it doesnt crash the app
// when hosted on heroku
try {
  env(path.join(__dirname, './.env'));
} catch (error) {
  /**/
}

// export the webpack configurations
module.exports = {
  // if debug is in production use inline-sourcemap as a devtool else dont't
  devtool: 'inline-sourcemap',
  // define the entry point of the application.
  entry: [
    'webpack-hot-middleware/client',
    './client/js/client.js'
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  // define the module loaders to be used by the webpack
  module: {
    loaders: [
      {
        // use babel-loader for transpiling js and jsx files in es6 to es5
        // exclude the node_modules folder
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'react-hmre'],
        }
      },
      {
        // use style-loader, css-loader, and sass-loader for .scss
        // file extensions
        test: /\.(scss|css)?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        // use file-loader for transpiling font files
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },

  // specify the output path for bundled file
  output: {
    path: path.resolve('./client/dist'),
    filename: 'bundle.min.js',
    publicPath: '/dist/'
  },
  // assign the node files that cannot be found to empty
  node: {
    net: 'empty',
    dns: 'empty',
    fs: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  // webpack plugins
  plugins: [
    new ExtractTextPlugin('css/main.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Hammer: 'hammerjs/hammer'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        SMS_API_KEY: JSON.stringify(process.env.SMS_API_KEY),
        SMS_API_SECRET: JSON.stringify(process.env.SMS_API_SECRET),
        EMAIL_NAME: JSON.stringify(process.env.EMAIL_NAME),
        EMAIL_PASSWORD: JSON.stringify(process.env.EMAIL_PASSWORD)
      },
    })
  ],
};
