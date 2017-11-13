import path from 'path';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';


const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
  entry: [
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
    new webpack.DefinePlugin(GLOBALS),
    new Dotenv({
      path: './.env',
      safe: false
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: path.join(__dirname, 'Client'),
        loaders: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'Client'),
        loaders: ['react-hot-loader', 'babel-loader'],
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
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: 'file-loader?name=Client/img/[name].[ext]',
      }
    ],
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.scss', '.jpg', '.png', '.gif', '.jpeg']
  }
};
