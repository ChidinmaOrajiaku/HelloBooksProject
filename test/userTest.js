process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import models from '../Server/server/models';
import app from '../Server/app';

const bcrypt = require('bcrypt');

require('dotenv').config();

const should = chai.should();
const Users = models.Users;
const Books = models.Books;


chai.use(chaiHttp);

const user = {
  firstname: 'Chidinnma',
  lastname: 'Orajiaku',
  username: 'corajiaku96',
  email: 'corajiaku96@gmail.com',
  password: bcrypt.hashSync('1996', bcrypt.genSaltSync(10))
};

const admin = {
  firstname: 'Admin',
  lastname: 'Tosin',
  username: 'admin96',
  email: 'admin96@gmail.com',
  password: bcrypt.hashSync('1996', bcrypt.genSaltSync(10))
};

const book = {
  title: 'Admin',
  author: 'Tosin',
  category: 'admin',
  image: 'https://static.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg',
  review: 'Nice Book'
};

const verifyPassword = user.password;
const password = bcrypt.hashSync('1995', bcrypt.genSaltSync(10));

let token = '';
let adminToken = '';


describe('Users', () => {
  describe('Create User', () => {
    it('should let users sign up', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.message.should.be.equal('Account Created');
          res.body.username.should.be.equal('corajiaku96');
          if (err) return expect(err.message);
          done();
        });
    });
    it('should let admin sign up', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(admin)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.message.should.be.equal('Welcome admin');
          res.body.username.should.be.equal('admin96');
          if (err) return expect(err.message);
          done();
        });
    });
    it('should not let users sign up with an already existing username and email', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(admin)
        .end((err) => {
          err.should.have.status(400);
          done();
        });
    });
    it('should not let users sign up with an already existing email', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send({
          firstname: admin.firstname,
          lastname: admin.lastname,
          username: 'corajiaku',
          email: 'admin96@gmail.com',
          password: bcrypt.hashSync('1996', bcrypt.genSaltSync(10))
        })
        .end((err) => {
          err.should.have.status(400);
          done();
        });
    });
    it('should not let users sign up without a lastname', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send({
          firstname: admin.firstname,
          username: 'corajiaku',
          email: 'admin96mailcom',
          password: bcrypt.hashSync('1996', bcrypt.genSaltSync(10))
        })
        .end((err) => {
          err.should.have.status(400);
          done();
        });
    });
  });
  describe('User sign in', () => {
    it('should let users sign in', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(user)
        .end((err, res) => {
          token = res.body.token;
          res.should.have.status(200);
          res.should.be.json;
          res.body.message.should.be.equal('Successfully logged in');
          res.body.username.should.be.equal(user.username);
          if (err) return expect(err.message);
          done();
        });
    });
    it('should let users sign in', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(admin)
        .end((err, res) => {
          adminToken = res.body.token;
          res.should.have.status(200);
          res.should.be.json;
          res.body.message.should.be.equal('Welcome admin');
          res.body.username.should.be.equal(admin.username);
          if (err) return expect(err);
          done();
        });
    });
    it('should let users sign in', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({ username: 'corajiaku', email: 'admin96mailcom', password: admin.password })
        .end((err) => {
          err.should.have.status(401);
          done();
        });
    });
  });
  describe('User update password', () => {
    it('should let users update password', (done) => {
      chai.request(app)
        .put('/api/v1/users/1')
        .send({ password, verifyPassword })
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.message.should.be.equal('Succesfully Updated');
          if (err) return expect(err);
          done();
        });
    });
    it('should not let users update password without token', (done) => {
      chai.request(app)
        .put('/api/v1/users/1')
        .send({ password, verifyPassword })
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
  });
  describe('User get request', () => {
    it('should let users get details', (done) => {
      chai.request(app)
        .get('/api/v1/users/2')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.firstname.should.be.equal('Admin');
          res.body.lastname.should.be.equal('Tosin');
          res.body.email.should.be.equal('admin96@gmail.com');
          if (err) return expect(err);
          done();
        });
    });
    it('should not let users get details without token', (done) => {
      chai.request(app)
        .get('/api/v1/users/2')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
  });
  describe('Admin get user count', () => {
    it('should get user count', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('x-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.count.should.be.equal(2);
          if (err) return expect(err);
          done();
        });
    });
    it('should not get user count without token', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
    it('should not get user count without admin token', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.body.message.should.be.equal('Solely for the admin');
          done();
        });
    });
  });
});


describe('Books request', () => {
  describe('Books create request', () => {
    it('should list no books because ther ara no books in the library yet', (done) => {
      chai.request(app)
        .get('/api/v1/users/books')
        .set('Content-Type', 'application/json')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.message.should.be.equal('No books in the library');
          res.finished = true;
          done();
        });
    });
    it('should let admin create books', (done) => {
      chai.request(app)
        .post('/api/v1/users/books')
        .set('x-token', adminToken)
        .send(book)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.message.should.be.equal('Succesfully added');
          if (err) return expect(err);
          done();
        });
    });
    it('should not let admin create books without token', (done) => {
      chai.request(app)
        .post('/api/v1/users/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
    it('should not let admin create books without admin token', (done) => {
      chai.request(app)
        .post('/api/v1/users/books')
        .set('x-token', token)
        .send(book)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.body.message.should.be.equal('Solely for the admin');
          done();
        });
    });
    it('should not let admin create books', (done) => {
      chai.request(app)
        .post('/api/v1/users/books')
        .set('x-token', adminToken)
        .send({ title: book.title, author: book.author, category: book.category })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          done();
        });
    });
  });
  describe('Books get request', () => {
    it('should list books', (done) => {
      chai.request(app)
        .get('/api/v1/users/books')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].title.should.be.equal('Admin');
          res.body[0].author.should.be.equal('Tosin');
          res.body[0].category.should.be.equal('admin');
          res.body[0].image.should.be.equal('https://static.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg');
          res.body[0].review.should.be.equal('Nice Book');
          if (err) return expect(err);
          done();
        });
    });
    it('should not let users get books without token', (done) => {
      chai.request(app)
        .get('/api/v1/users/books')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
  });
  describe('Get 1 book request', () => {
    it('should list a book', (done) => {
      chai.request(app)
        .get('/api/v1/books/1')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.title.should.be.equal('Admin');
          res.body.author.should.be.equal('Tosin');
          res.body.category.should.be.equal('admin');
          res.body.image.should.be.equal('https://static.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg');
          res.body.review.should.be.equal('Nice Book');
          if (err) return expect(err);
          done();
        });
    });
    it('should not list a book with an invalid id', (done) => {
      chai.request(app)
        .get('/api/v1/books/a')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.message.should.be.equal('Invalid Id');
          done();
        });
    });
    it('should not list a non existent book', (done) => {
      chai.request(app)
        .get('/api/v1/books/2')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.message.should.be.equal('Book Not Found');
          done();
        });
    });
    it('should not list a book without token', (done) => {
      chai.request(app)
        .get('/api/v1/books/1')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
  });

  describe('Borrow books action', () => {
    it('should not return rented books because no book has been borrowed ', (done) => {
      chai.request(app)
        .put('/api/v1/users/1/books')
        .set('x-token', adminToken)
        .send({ bookId: 1 })
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.message.should.be.equal('Book Not Found');
          done();
        });
    });
    it('should not get unreturned rented books because no book has been borrowed ', (done) => {
      chai.request(app)
        .get('/api/v1/users/books/unreturned')
        .set('x-token', adminToken)
        .send({ bookId: 1 })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.message.should.be.equal('No books in the library');
          done();
        });
    });
    it('should not get history of borrowed books because no book has been borrowed ', (done) => {
      chai.request(app)
        .get('/api/v1/users/1/history')
        .set('x-token', token)
        .send({ bookId: 1 })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.message.should.be.equal('No books in the library');
          done();
        });
    });
    it('should not list not returned rented books because no book has been borrowed ', (done) => {
      chai.request(app)
        .get('/api/v1/users/1/books')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.message.should.be.equal('No books in the library');
          done();
        });
    });
    it('should borrow books', (done) => {
      chai.request(app)
        .post('/api/v1/users/1/books')
        .set('x-token', token)
        .send({ bookId: 1 })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          if (err) return expect(err);
          done();
        });
    });
    it('should not borrow books twice', (done) => {
      chai.request(app)
        .post('/api/v1/users/1/books')
        .set('x-token', token)
        .send({ bookId: 1 })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.message.should.be.equal('Book has been borrowed but not returned');
          done();
        });
    });
    it('should not borrow a book with an invalid id', (done) => {
      chai.request(app)
        .post('/api/v1/users/1/books')
        .set('x-token', token)
        .send({ bookId: 'a' })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.message.should.be.equal('Invalid Id');
          done();
        });
    });
    it('should not borrow a book with an invalid user id', (done) => {
      chai.request(app)
        .post('/api/v1/users/a/books')
        .set('x-token', token)
        .send({ bookId: 1 })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.message.should.be.equal('Invalid Id');
          done();
        });
    });
    it('should not borrow a book with an unknown id', (done) => {
      chai.request(app)
        .post('/api/v1/users/1/books')
        .set('x-token', token)
        .send({ bookId: 2 })
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.message.should.be.equal('Book Not Found');
          done();
        });
    });
    it('should not borrow books without token', (done) => {
      chai.request(app)
        .post('/api/v1/users/1/books')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
  });
  describe('Get history of borrowed books', () => {
    it('should get history of borrowed books', (done) => {
      chai.request(app)
        .get('/api/v1/users/1/history')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].Book.title.should.be.equal('Admin');
          res.body[0].Book.author.should.be.equal('Tosin');
          res.body[0].Book.category.should.be.equal('admin');
          res.body[0].Book.image.should.be.equal('https://static.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg');
          res.body[0].Book.review.should.be.equal('Nice Book');
          if (err) return expect(err);
          done();
        });
    });
    it('should not get history of borrowed books with an invalid id', (done) => {
      chai.request(app)
        .get('/api/v1/users/a/history')
        .set('x-token', adminToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.message.should.be.equal('Invalid Id');
          done();
        });
    });
    it('should not get history of borrowed books without token', (done) => {
      chai.request(app)
        .get('/api/v1/users/2/history')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
  });
  describe('Get history of borrowed but not returned books', () => {
    it('should get history of borrowed books', (done) => {
      chai.request(app)
        .get('/api/v1/users/1/books')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].Book.title.should.be.equal('Admin');
          res.body[0].Book.author.should.be.equal('Tosin');
          res.body[0].Book.category.should.be.equal('admin');
          res.body[0].Book.image.should.be.equal('https://static.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg');
          res.body[0].Book.review.should.be.equal('Nice Book');
          if (err) return expect(err);
          done();
        });
    });
    it('should not borrow a book with an invalid user id', (done) => {
      chai.request(app)
        .get('/api/v1/users/a/books')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.message.should.be.equal('Invalid Id');
          done();
        });
    });
    it('should not get history of borrowed books but not returned without token', (done) => {
      chai.request(app)
        .get('/api/v1/users/1/books')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
  });
  describe('Admin should update books', () => {
    it('should update books', (done) => {
      chai.request(app)
        .put('/api/v1/books/1')
        .set('x-token', adminToken)
        .send({
          title: book.title, author: book.author, category: 'Fiction', image: 'https://static.pexels.com/photos/158607/cairn-fog-mystical-background-145677.jpeg', review: 'Nice'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.title.should.be.equal('Admin');
          res.body.author.should.be.equal('Tosin');
          res.body.category.should.be.equal('Fiction');
          res.body.image.should.be.equal('https://static.pexels.com/photos/158607/cairn-fog-mystical-background-145677.jpeg');
          res.body.review.should.be.equal('Nice');
          if (err) return expect(err);
          done();
        });
    });
    it('should not list a book with an invalid id', (done) => {
      chai.request(app)
        .put('/api/v1/books/a')
        .set('x-token', adminToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.message.should.be.equal('Invalid Id');
          done();
        });
    });
    it('should not list a non-existent book', (done) => {
      chai.request(app)
        .put('/api/v1/books/3')
        .set('x-token', adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.message.should.be.equal('Book Not Found');
          done();
        });
    });
    it('should not update books without admin token', (done) => {
      chai.request(app)
        .put('/api/v1/books/1')
        .set('x-token', token)
        .send({
          title: book.title, author: book.author, category: 'Fiction', image: 'https://static.pexels.com/photos/158607/cairn-fog-mystical-background-145677.jpeg', review: 'Nice'
        })
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.body.message.should.be.equal('Solely for the admin');
          done();
        });
    });
    it('should not update books without token', (done) => {
      chai.request(app)
        .put('/api/v1/books/1')
        .send({
          title: book.title, author: book.author, category: 'Fiction', image: 'https://static.pexels.com/photos/158607/cairn-fog-mystical-background-145677.jpeg', review: 'Nice'
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
  });
  describe('Get book count', () => {
    it('should get book count', (done) => {
      chai.request(app)
        .get('/api/v1/books')
        .set('x-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.count.should.be.equal(1);
          if (err) return expect(err);
          done();
        });
    });
    it('should not get book count without token', (done) => {
      chai.request(app)
        .get('/api/v1/books')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
    it('should not get book count without admin token', (done) => {
      chai.request(app)
        .get('/api/v1/books')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.body.message.should.be.equal('Solely for the admin');
          done();
        });
    });
  });
  describe('Get unreturned rented books count', () => {
    it('should get unreturned rented books count', (done) => {
      chai.request(app)
        .get('/api/v1/users/books/unreturned/history')
        .set('x-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.count.should.be.equal(1);
          if (err) return expect(err);
          done();
        });
    });
    it('should not get unreturned rented books count without token', (done) => {
      chai.request(app)
        .get('/api/v1/users/books/unreturned/history')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
    it('should not get unreturned rented books count without admin token', (done) => {
      chai.request(app)
        .get('/api/v1/users/books/unreturned/history')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.body.message.should.be.equal('Solely for the admin');
          done();
        });
    });
  });
  describe('Get rented books count', () => {
    it('should get rented books count', (done) => {
      chai.request(app)
        .get('/api/v1/rentedbooks/history/all')
        .set('x-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.count.should.be.equal(1);
          if (err) return expect(err);
          done();
        });
    });
    it('should not get rented books count without token', (done) => {
      chai.request(app)
        .get('/api/v1/rentedbooks/history/all')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
    it('should not get rented books count without admin token', (done) => {
      chai.request(app)
        .get('/api/v1/rentedbooks/history/all')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.body.message.should.be.equal('Solely for the admin');
          done();
        });
    });
  });
  describe('Get unreturned rented books ', () => {
    it('should get unreturned rented books ', (done) => {
      chai.request(app)
        .get('/api/v1/users/books/unreturned')
        .set('x-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].Book.title.should.be.equal('Admin');
          res.body[0].Book.author.should.be.equal('Tosin');
          res.body[0].Book.category.should.be.equal('Fiction');
          res.body[0].Book.image.should.be.equal('https://static.pexels.com/photos/158607/cairn-fog-mystical-background-145677.jpeg');
          res.body[0].Book.review.should.be.equal('Nice');
          if (err) return expect(err);
          done();
        });
    });
    it('should not get unreturned rented books without token', (done) => {
      chai.request(app)
        .get('/api/v1/users/books/unreturned')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
    it('should not get unreturned rented books without admin token', (done) => {
      chai.request(app)
        .get('/api/v1/users/books/unreturned')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.body.message.should.be.equal('Solely for the admin');
          done();
        });
    });
  });
  describe('Return rented books ', () => {
    it('should return rented books ', (done) => {
      chai.request(app)
        .put('/api/v1/users/1/books')
        .set('x-token', token)
        .send({ bookId: 1 })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.message.should.be.equal('Successfully Returned');
          if (err) return expect(err);
          done();
        });
    });
    it('should not return a book with an invalid user id', (done) => {
      chai.request(app)
        .put('/api/v1/users/1/books')
        .set('x-token', token)
        .send({ bookId: 'a' })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.message.should.be.equal('Invalid Id');
          done();
        });
    });
    it('should not return rented books without token', (done) => {
      chai.request(app)
        .put('/api/v1/users/1/books')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
  });
  describe('Create category', () => {
    it('should create category', (done) => {
      chai.request(app)
        .post('/api/v1/books/category')
        .set('x-token', adminToken)
        .send({ category: 'Motivational' })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.category.should.be.equal('Motivational');
          if (err) return expect(err);
          done();
        });
    });
    it('should not create category', (done) => {
      chai.request(app)
        .post('/api/v1/books/category')
        .set('x-token', adminToken)
        .send({ category: 'Motivational' })
        .end((err) => {
          err.should.have.status(400);
          done();
        });
    });
    it('should not create category without token', (done) => {
      chai.request(app)
        .post('/api/v1/books/category')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
    it('should not create category without admin token', (done) => {
      chai.request(app)
        .post('/api/v1/books/category')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.body.message.should.be.equal('Solely for the admin');
          done();
        });
    });
  });
  describe('Get category count', () => {
    it('should get category count', (done) => {
      chai.request(app)
        .get('/api/v1/books/category/history')
        .set('x-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.count.should.be.equal(1);
          if (err) return expect(err);
          done();
        });
    });
    it('should not get category count without token', (done) => {
      chai.request(app)
        .get('/api/v1/books/category/history')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
    it('should not get category count without admin token', (done) => {
      chai.request(app)
        .get('/api/v1/books/category/history')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.body.message.should.be.equal('Solely for the admin');
          done();
        });
    });
  });
  describe('Get category', () => {
    it('should get category', (done) => {
      chai.request(app)
        .get('/api/v1/books/category/all')
        .set('x-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body[0].category.should.be.equal('Motivational');
          if (err) return expect(err);
          done();
        });
    });
    it('should not get category without token', (done) => {
      chai.request(app)
        .get('/api/v1/books/category/all')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
    it('should not get category without admin token', (done) => {
      chai.request(app)
        .get('/api/v1/books/category/all')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.body.message.should.be.equal('Solely for the admin');
          done();
        });
    });
  });
  describe('Delete Book', () => {
    it('should delete book', (done) => {
      chai.request(app)
        .delete('/api/v1/books/1')
        .set('x-token', adminToken)
        .end((err, res) => {
          res.should.have.status(204);
          if (err) return expect(err);
          done();
        });
    });
    it('should delete book with an invalid id', (done) => {
      chai.request(app)
        .delete('/api/v1/books/a')
        .set('x-token', adminToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.equal('Invalid Id');
          done();
        });
    });
    it('should not delete book without token', (done) => {
      chai.request(app)
        .delete('/api/v1/books/1')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.error.should.be.equal('Unauthorised user');
          done();
        });
    });
    it('should not delete book without admin token', (done) => {
      chai.request(app)
        .delete('/api/v1/books/1')
        .set('x-token', token)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.body.message.should.be.equal('Solely for the admin');
          done();
        });
    });
  });
});
