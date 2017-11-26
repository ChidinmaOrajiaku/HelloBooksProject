import * as validateId from '../utils/validateId';
import db from '../models';
import messages from '../utils/messages';

const booksController = {
  /**
   * Create Books
   * @param {any} req 
   * @param {any} res 
   * @returns {object} req, res
   */
  create(req, res) {
    const { title, author, category, image, review } = req.body;
    return db.Books
      .create({
        title,
        author,
        category,
        image,
        review,
      })
      .then(() => res.status(201).send({ message: 'Succesfully added' }))
      .catch((error) => {
        const errorMessage = error.errors.map(value => value.message);
        return res.status(400).send(errorMessage);
      });
  },
  /**
   * List all Books
   * @param {any} req 
   * @param {any} res 
      * @returns {object} req, res
   */
  list(req, res) {
    // find all books
    return db.Books
      .findAll({})
      .then((books) => {
        if (books.length === 0) {
          res.status(200).send({ message: messages.noBooks });
        }
        res.status(200).send(books);
      })
      .catch((error) => {
        res.status(500).send({
          message: messages.generalError,
          error
        });
      });
  },
  /**
   * List a book
   * @param {any} req 
   * @param {any} res 
   * @returns {object} req, res
   */
  listABook(req, res) {
    const returnedId = validateId.validate(req.params.id);
    if (isNaN(returnedId)) {
      return res.status(400).send({
        message: messages.invalidId
      });
    }
    // find one books
    return db.Books
      .findById(returnedId)
      .then((books) => {
        if (!books) {
          res.status(404).send({ message: messages.notFoundBook });
        }
        res.status(200).send(books);
      })
      .catch((error) => {
        res.status(500).send({
          message: messages.generalError,
          error
        });
      });
  },
  /**
   * Update Book
   * @param {any} req 
   * @param {any} res 
   * @returns {object} req, res
   */
  update(req, res) {
    const { title, author, category, image, review } = req.body;
    const returnedId = validateId.validate(req.params.booksId);
    if (isNaN(returnedId)) {
      return res.status(400).send({
        message: messages.invalidId
      });
    }
    // update books
    return db.Books
      .findById(returnedId)
      .then((books) => {
        if (!books) {
          return res.status(404).send({
            message: messages.notFoundBook,
          });
        }
        books.update({
          title,
          author,
          category,
          image,
          review,
        })
          .then(() => res.status(200).send(books))
          .catch((error) => {
            const errorMessage = error.errors.map(value => value.message);
            return res.status(400).send(errorMessage);
          });
      })
      .catch((error) => {
        res.status(500).send({
          message: 'Book cannot be updated',
          error
        });
      });
  },
  /**
   * Delete Book
   * @param {any} req 
   * @param {any} res 
   * @returns {object} req, res
   */
  deleteBook(req, res) {
    const returnedId = validateId.validate(req.params.booksId);
    if (isNaN(returnedId)) {
      return res.status(400).send({
        message: messages.invalidId
      });
    }
    return db.Books
      .findById(returnedId)
      .then((books) => {
        if (!books) {
          return res.status(200).send({
            message: messages.notFoundBook
          });
        }
        books.destroy()
          .then(() => res.status(204).send({
            message: 'Book Deleted'
          }))
          .catch(error => res.status(400).send({
            message: 'Book could not be deleted',
            error
          }));
      })
      .catch(error => res.status(500).send({
        message: messages.generalError,
        error
      }));
  },
  /**
   * Borrow Book
   * @param {any} req 
   * @param {any} res 
   * @returns {object} req, res
   */
  borrow(req, res) {
    const returnedId = validateId.validate(req.body.bookId);
    const userReturnedId = validateId.validate(req.params.userId);
    if (isNaN(returnedId)) {
      return res.status(400).send({
        message: messages.invalidId
      });
    }
    if (isNaN(userReturnedId)) {
      return res.status(400).send({
        message: messages.invalidId
      });
    }
    const cur = new Date();
    // get 24 days after borrowed date 
    const after24Days = cur.setDate(cur.getDate() + 24);
    return db.Books
      .findById(returnedId)
      .then((books) => {
        if (!books) {
          return res.status(404).send({ message: messages.notFoundBook });
        }
        db.RentedBooks.findAndCountAll({
          where: {
            returned: false,
            userId: userReturnedId,
          }
        })
          .then((rentedBooks) => {
            const checkRentedBooks = rentedBooks.rows;
            const filterRentedBooks = book => book.bookId === returnedId;
            const filtered = checkRentedBooks.filter(filterRentedBooks);
            if (rentedBooks.count >= 3) {
              return res.status(200).send({
                message: 'Borrowing limit has been reached'
              });
            } else if (filtered.length !== 0) {
              return res.status(200).send({
                message: 'Book has been borrowed but not returned'
              });
            }
            // create rented books history
            db.RentedBooks.create({
              userId: req.params.userId,
              bookId: req.body.bookId,
              toReturnDate: after24Days,
            })
              .then(RentedBooks => res.status(201).send(RentedBooks));
          })
          .catch((error) => {
            res.status(404).send({
              message: 'Rented Book could not be found',
              error
            });
          });
      })
      .catch((error) => {
        res.status(500).send({
          message: messages.generalError,
          error
        });
      });
  },
  /**
 * List all books borrowed by user
 * @param {any} req 
 * @param {any} res 
 * @returns {object} req, res
 */
  listAllBooksBorrowed(req, res) {
  // find all books
    return db.RentedBooks
      .findAll({
        where: {
          usersId: req.params.usersId
        },
        include: [{
          model: db.Books,
        },
        {
          model: db.Category
        }
        ],
      })
      .then((RentedBooks) => {
        if (RentedBooks.length === 0) {
          res.status(404).send({ message: 'No books in the library' });
        }
        res.status(200).send(RentedBooks);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  /**
     * List all books not returned by user
     * @param {any} req 
     * @param {any} res 
     * @returns {object} req, res
     */
  listNotReturnedBooks(req, res) {
    // list books borrowed but not returned
    return db.RentedBooks
      .findAll({
        where: {
          returned: false,
          usersId: req.params.usersId
        },
        include: [{
          model: db.Books,
        },
        {
          model: db.Category
        }
        ],
      })
      .then((books) => {
        if (books.length === 0) {
          res.status(404).send('No books in the library');
        }
        res.status(200).send(books);
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  },
  /**
       * List all books borrowed
       * @param {any} req 
       * @param {any} res 
       * @returns {object} req, res
       */
  adminListNotReturnedBooks(req, res) {
    // admin list books borrowed but not returned
    return db.RentedBooks
      .findAll({
        where: {
          returned: false,
        },
        include: [{
          model: db.Books,
        },
        {
          model: db.Category
        }
        ],
      })
      .then((books) => {
        if (books.length === 0) {
          res.status(404).send('No books in the library');
        }
        res.status(200).send(books);
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  },
  /**
       * Return all books borrowed by user
       * @param {any} req 
       * @param {any} res 
       * @returns {object} req, res
       */
  returnBooks(req, res) {
    // return borrowed books
    return db.RentedBooks
      .findOne({
        where: {
          returned: false,
          booksId: req.body.booksId
        }
      })
      .then((rentedBooks) => {
        if (!rentedBooks) {
          return res.status(404).send({ message: ' Cannot return' });
        }
        rentedBooks.update({
          returned: true,
          returnDate: Date.now(),
          usersId: req.params.usersId
        })
          .then(() => res.status(200).send({ message: 'Successfully Returned' }))
          .catch(error => res.status(404).send(error));
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  },
  adminCountAllBooks(req, res) {
    return db.Books
      .findAndCountAll({})
      .then((books) => {
        res.status(200).send(books);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  adminCountAllRentedBooks(req, res) {
    return db.RentedBooks
      .findAndCountAll({})
      .then((rentedbooks) => {
        res.status(200).send(rentedbooks);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  adminCountAllNotReturnedBooks(req, res) {
    return db.RentedBooks
      .findAndCountAll({
        where: {
          returned: false
        }
      })
      .then((rentedbooks) => {
        res.status(200).send(rentedbooks);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  adminCreateCategory(req, res) {
    return db.Category
      .create({
        category: req.body.category
      })
      .then((category) => {
        res.status(201).send(category);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  adminCountCategory(req, res) {
    return db.Category
      .findAndCountAll({})
      .then((category) => {
        res.status(200).send(category);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  adminGetCategory(req, res) {
    return db.Category
      .findAll({})
      .then((category) => {
        res.status(200).send(category);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
};
export default booksController;

