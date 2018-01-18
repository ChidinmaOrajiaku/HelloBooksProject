import userController from '../controllers/user';

import bookController from '../controllers/book';

import authenticate from '../middlewares/auth';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the HelloBooks API!',
  }));

  /**
   * Users API
   */
  app.post('/api/v1/users/signup', userController.create);
  app.post('/api/v1/users/signin', userController.login);
  app.put('/api/v1/users/:userId', authenticate.verifyUser, userController.updatePassword);
  app.get('/api/v1/users/books', authenticate.verifyUser, bookController.list);
  app.get('/api/v1/books/:id', authenticate.verifyUser, bookController.listABook);
  app.get('/api/v1/users/:userId', authenticate.verifyUser, userController.getUser);
  app.get('/api/v1/users/:userId/history', authenticate.verifyUser, bookController.listAllBooksBorrowed);
  app.post('/api/v1/users/:userId/books', authenticate.verifyUser, bookController.borrow);
  app.get('/api/v1/users/:userId/books', authenticate.verifyUser, bookController.listNotReturnedBooks);
  app.put('/api/v1/users/:userId/books', authenticate.verifyUser, bookController.returnBooks);

  /**
   * Admin API
   */
  app.get('/api/v1/users', authenticate.verifyUser, authenticate.verifyAdmin, userController.adminCountAllUser);
  app.post('/api/v1/users/books', authenticate.verifyUser, authenticate.verifyAdmin, bookController.create);
  app.put('/api/v1/books/:bookId', authenticate.verifyUser, authenticate.verifyAdmin, bookController.update);
  app.delete('/api/v1/books/:bookId', authenticate.verifyUser, authenticate.verifyAdmin, bookController.deleteBook);
  app.get('/api/v1/books', authenticate.verifyUser, authenticate.verifyAdmin, bookController.adminCountAllBooks);
  app.get('/api/v1/rentedbooks/history/all', authenticate.verifyUser, authenticate.verifyAdmin, bookController.adminCountAllRentedBooks);
  app.get('/api/v1/users/books/unreturned/history', authenticate.verifyUser, authenticate.verifyAdmin, bookController.adminCountAllNotReturnedBooks);
  app.get('/api/v1/users/books/unreturned', authenticate.verifyUser, authenticate.verifyAdmin, bookController.adminListNotReturnedBooks);
  app.post('/api/v1/books/category', authenticate.verifyUser, authenticate.verifyAdmin, bookController.adminCreateCategory);
  app.get('/api/v1/books/category/history', authenticate.verifyUser, authenticate.verifyAdmin, bookController.adminCountCategory);
  app.get('/api/v1/books/category/all', authenticate.verifyUser, authenticate.verifyAdmin, bookController.adminGetCategory);
};

