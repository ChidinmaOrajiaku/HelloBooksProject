import path from 'path';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';

export default {
  entry: [
    'webpack-hot-middleware/Client?reload=true',
    path.join(__dirname, '/Client/index.js'),
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'cheap-eval-source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: './.env',
      safe: false
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'Client'),
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }
    ],
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.scss']
  }
};
