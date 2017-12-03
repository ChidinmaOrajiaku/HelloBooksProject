import usersController from '../controllers/user';

import booksController from '../controllers/book';

import authenticate from '../middlewares/auth';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the HelloBooks API!',
  }));

  /**
   * Users API
   */
  app.post('/api/v1/users/signup', usersController.create);
  app.post('/api/v1/users/signin', usersController.login);
  app.put('/api/v1/users/:userId', authenticate.verifyUser, usersController.updatePassword);
  app.get('/api/v1/users/books', authenticate.verifyUser, booksController.list);
  app.get('/api/v1/books/:id', authenticate.verifyUser, booksController.listABook);
  app.get('/api/v1/users/:userId', authenticate.verifyUser, usersController.getUser);
  app.get('/api/v1/users/:userId/history', authenticate.verifyUser, booksController.listAllBooksBorrowed);
  app.post('/api/v1/users/:userId/books', authenticate.verifyUser, booksController.borrow);
  app.get('/api/v1/users/:userId/books', authenticate.verifyUser, booksController.listNotReturnedBooks);
  app.put('/api/v1/users/:userId/books', authenticate.verifyUser, booksController.returnBooks);

  /**
   * Admin API
   */
  app.get('/api/v1/users', authenticate.verifyUser, authenticate.verifyAdmin, usersController.adminCountAllUser);
  app.post('/api/v1/users/books', authenticate.verifyUser, authenticate.verifyAdmin, booksController.create);
  app.put('/api/v1/books/:bookId', authenticate.verifyUser, authenticate.verifyAdmin, booksController.update);
  app.delete('/api/v1/books/:bookId', authenticate.verifyUser, authenticate.verifyAdmin, booksController.deleteBook);
  app.get('/api/v1/books', authenticate.verifyUser, authenticate.verifyAdmin, booksController.adminCountAllBooks);
  app.get('/api/v1/users/books/history', authenticate.verifyUser, authenticate.verifyAdmin, booksController.adminCountAllRentedBooks);
  app.get('/api/v1/users/books/unreturned/history', authenticate.verifyUser, authenticate.verifyAdmin, booksController.adminCountAllNotReturnedBooks);
  app.get('/api/v1/users/books/unreturned', authenticate.verifyUser, authenticate.verifyAdmin, booksController.adminListNotReturnedBooks);
  app.post('/api/v1/books/category', authenticate.verifyUser, authenticate.verifyAdmin, booksController.adminCreateCategory);
  app.get('/api/v1/books/category/history', authenticate.verifyUser, authenticate.verifyAdmin, booksController.adminCountCategory);
  app.get('/api/v1/books/category/all', authenticate.verifyUser, authenticate.verifyAdmin, booksController.adminGetCategory);
};

