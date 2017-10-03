import usersController from '../controllers/users';

import profileController from '../controllers/profile';

import booksController from '../controllers/books';

import authenticate from '../middlewares/auth';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the HelloBooks API!',
  }));

  app.post('/api/v1/users/signup', usersController.create);
  app.post('/api/v1/users/signin', usersController.login);
  app.put('/api/v1/users/:usersId', authenticate.verifyUser, usersController.updatePassword);
  
  app.post('/api/v1/users/books', authenticate.verifyUser, authenticate.verifyAdmin, booksController.create);
  app.get('/api/v1/users/books', authenticate.verifyUser, booksController.list);
  app.put('/api/v1/books/:booksId', authenticate.verifyUser, authenticate.verifyAdmin, booksController.update);
  app.delete('/api/v1/books/:booksId', authenticate.verifyUser, authenticate.verifyAdmin, booksController.deleteBook);
  app.get('/api/v1/users/:usersId/history', authenticate.verifyUser, booksController.listAllBooksBorrowed);
  app.post('/api/v1/users/:usersId/books', authenticate.verifyUser, booksController.borrow);
  app.get('/api/v1/users/:usersId/books', authenticate.verifyUser, booksController.listNotReturnedBooks);
  app.put('/api/v1/users/:usersId/books', authenticate.verifyUser, booksController.returnBooks);

  app.post('/api/v1/users/:usersId/profile', authenticate.verifyUser, profileController.createProfile);
  app.put('/api/v1/users/:usersId/profile', authenticate.verifyUser, profileController.updateProfile);
  app.get('/api/v1/users/:usersId', authenticate.verifyUser, usersController.getUser);
  app.get('/api/v1/users/:usersId/profile', authenticate.verifyUser, profileController.getProfile);
};

