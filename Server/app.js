import express from 'express';

import logger from 'morgan';

import bodyParser from 'body-parser';

import path from 'path';

import webpack from 'webpack';

import webpackMiddleware from 'webpack-dev-middleware';

import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../webpack.config';

import routes from './server/routes';

// Set up the express app
const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));
// webpack configuration
const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publcPath: webpackConfig.output.publicPath,
  noInfo: true
}));

app.use(webpackHotMiddleware(compiler));
// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('secret', 'corajiaku96');

// Require our routes into the application.
routes(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

export default app;
