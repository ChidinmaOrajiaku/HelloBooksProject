import usersController from '../controllers/users';

import booksController from '../controllers/books';

import authenticate from '../middlewares/auth';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the HelloBooks API!',
  }));

  app.post('/api/v1/users/signup', usersController.create);
  app.post('/api/v1/users/signin', usersController.login);

  app.post('/api/v1/users/books', authenticate.verifyUser, authenticate.verifyAdmin, booksController.create);
  app.get('/api/v1/users/books', authenticate.verifyUser, booksController.list);
  app.put('/api/v1/books/:booksId', authenticate.verifyUser, authenticate.verifyAdmin, booksController.update);
  app.post('/api/v1/users/:usersId/books', authenticate.verifyUser, booksController.borrow);
  app.get('/api/v1/users/:usersId/books', authenticate.verifyUser, booksController.listNotReturnedBooks);
  app.put('/api/v1/users/:usersId/books', authenticate.verifyUser, booksController.returnBooks);
};

