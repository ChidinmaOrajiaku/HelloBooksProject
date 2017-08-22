import path from 'path';
import webpack from 'webpack';

export default {
  entry: [
    'webpack-hot-middleware/Client',
    path.join(__dirname, '/Client/index.js'),
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'Client'),
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      }, {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.css']
  }
};
