import db from '../models';

const booksController = {
  // create books
  create(req, res) {
    return db.Books
      .create({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
      })
      .then(books => res.status(201).send(books))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    // find all books
    return db.Books
      .findAll({})
      .then((books) => {
        if (books.length === 0) {
          res.status(404).send('No books in the library');
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
          author: req.body.author,
          category: req.body.category,
        })
          .then(() => res.status(200).send({ message: 'Books Updated!' }))
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
    return db.Books.findById(req.body.booksId).then((books) => {
      if (books) {
        return books;
      }
    })
    // create rented books history
      .then(() => {
        db.RentedBooks.create({
          title: req.body.title,
          usersId: req.params.usersId,
          booksId: req.body.booksId,
          toReturnDate: after24Days,
        })
          .then(RentedBooks => res.status(200).send(RentedBooks))
          .catch(error => res.status(404).send(error));
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  listNotReturnedBooks(req, res) {
    // list books borrowed but not returned
    return db.RentedBooks
      .findOne({
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
  returnBooks(req, res) {
    // return borrowed books
    return db.RentedBooks
      .update({
        returned: true,
        returnDate: Date.now(),
        usersId: req.params.usersId
      },
      {
        where: {
          booksId: req.params.booksId
        }
      })
      .then(() => res.status(200).send({ message: 'Successfully Returned' }))
      .catch((error) => {
        res.status(404).send(error);
      });
  },
};
export default booksController;
