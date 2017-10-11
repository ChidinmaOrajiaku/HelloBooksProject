import db from '../models';

const booksController = {
  // create books
  create(req, res) {
    return db.Books
      .create({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        image: req.body.image,
        review: req.body.review,
        usersId: req.query.usersId
      })
      .then(() => res.status(201).send({ message: 'Succesfully added' }))
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  list(req, res) {
    // find all books
    return db.Books
      .findAll({})
      .then((books) => {
        if (books.length === 0) {
          res.status(404).send({ message: 'No books in the library' });
        }
        res.status(200).send(books);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  update(req, res) {
    // update books
    return db.Books
      .findById(req.params.booksId)
      .then((books) => {
        if (!books) {
          return res.status(404).send({
            message: 'Book Not Found',
          });
        }
        books.update({
          title: req.body.title,
          category: req.body.category,
          author: req.body.author
        })
          .then(() => res.status(200).send(books))
          .catch(error => res.status(400).send(error));
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  },
  deleteBook(req, res) {
    return db.Books.findById(req.params.booksId)
      .then((books) => {
        if (!books) {
          return res.status(200).send({ message: 'Book not found' });
        }
        books.destroy()
          .then(() => res.status(204).send({ message: 'Book Deleted' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  borrow(req, res) {
    const cur = new Date();
    const after24Days = cur.setDate(cur.getDate() + 24); // get 24 days after borrowed date 
    return db.Books
      .findById(req.body.booksId)
      .then((books) => {
        if (!books) {
          return res.status(404).send('Book Not Found');
        }
        return db.RentedBooks
          .findOne({
            where: {
              returned: false,
              usersId: req.params.usersId,
              booksId: req.body.booksId,
            }
          })
          .then((rentedBooks) => {
            if (rentedBooks) {
              return res.status(404).send('Book has been borrowed but not returned');
            }
            // create rented books history
            db.RentedBooks.create({
              usersId: req.params.usersId,
              booksId: req.body.booksId,
              toReturnDate: after24Days,
            })
              .then(RentedBooks => res.status(200).send(RentedBooks))
              .catch((error) => {
                res.status(404).send(error);
              });
          });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  listAllBooksBorrowed(req, res) {
    // find all books
    return db.RentedBooks
      .findAll({
        where: {
          usersId: req.params.usersId
        },
        include: [{
          model: db.Books
        }]
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
  listNotReturnedBooks(req, res) {
    // list books borrowed but not returned
    return db.RentedBooks
      .findAll({
        where: {
          returned: false,
          usersId: req.params.usersId
        }
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
  adminListNotReturnedBooks(req, res) {
    // admin list books borrowed but not returned
    return db.RentedBooks
      .findAll({})
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
        console.log(req.body);
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
  }
};
export default booksController;
