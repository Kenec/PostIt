const webpack = require('webpack');
const path = require('path');
const env = require('node-env-file');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

try {
  env(path.join(__dirname, './.env'));
} catch (error) {
  /**/
}

module.exports = {
  entry: [
    './client/js/client.jsx'
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      },
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
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './client/index.html'
    }),
    new ExtractTextPlugin('css/main.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Hammer: 'hammerjs/hammer'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
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
        EMAIL_PASSWORD: JSON.stringify(process.env.EMAIL_PASSWORD),
        JWT_SECRET: JSON.stringify(process.env.JWT_SECRET)
      },
    })
  ],
};
