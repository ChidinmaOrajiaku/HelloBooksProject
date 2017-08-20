import path from 'path';

export default {
  entry: path.join(__dirname, '/Client/index.js'),
  output: {
    path: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'Client'),
        loaders: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  }
};
