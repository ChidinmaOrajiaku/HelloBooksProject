import usersController from '../controllers/users';

import booksController from '../controllers/books';

import authenticate from '../middlewares/auth';
console.log(authenticate.jwtMiddleware);

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the HelloBooks API!',
  }));

  app.post('/api/v1/users/signup', usersController.create);
  app.post('/api/v1/users/signin', usersController.login);

  // app.use(authenticate.jwtMiddleware);
  app.post('/api/v1/users/books', booksController.create);
  app.get('/api/v1/users/books', booksController.list);
  app.put('/api/v1/books/:booksId', booksController.update);
  app.post('/api/v1/users/:usersId/books', booksController.borrow);
  app.get('/api/v1/users/:usersId/books', booksController.listNotReturnedBooks);
  app.put('/api/v1/users/:usersId/books', booksController.returnBooks);
};

