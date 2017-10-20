// process.env.NODE_ENV = 'test';
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import models from '../Server/server/models';
// import app from '../Server/app';
// import token from './userTest';
// import adminToken from './userTest';

// const bcrypt = require('bcrypt');

// require('dotenv').config();

// const should = chai.should();
// const Users = models.Users;
// const Books = models.Books;


// chai.use(chaiHttp);

// const book = [{
//   title: 'Admin',
//   author: 'Tosin',
//   category: 'admin96',
//   image: 'https://static.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg',
//   review: 'Nice Book'
// },
// {
//   title: 'Book',
//   author: 'Book',
//   category: 'Book',
//   image: 'https://static.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg',
//   review: 'Nice Book'
// },
// ];

// describe('Books request', () => {
//   describe('Books create request', () => {
//     it('should let admin create books', (done) => {
//       chai.request(app)
//         .post('/api/v1/users/books')
//         .set('x-token', adminToken)
//         .send(book[0], book[1])
//         .end((err, res) => {
//           res.should.have.status(201);
//           res.should.be.json;
//           res.body.message.should.be.equal('Succesfully added');
//           if (err) return expect(err);
//           done();
//         });
//     });
//     it('should not let admin create books without token', (done) => {
//       chai.request(app)
//         .post('/api/v1/users/books')
//         .send(book)
//         .end((err, res) => {
//           res.should.have.status(403);
//           res.should.be.json;
//           res.body.error.should.be.equal('Unauthorised user');
//           done();
//         });
//     });
//     it('should not let admin create books', (done) => {
//       chai.request(app)
//         .post('/api/v1/users/books')
//         .set('x-token', adminToken)
//         .send({ title: book.title, author: book.author, category: book.category })
//         .end((err, res) => {
//           res.should.have.status(400);
//           res.should.be.json;
//           // res.text.errors.message.should.be.equal('image cannot be null');
//           // res.text.errors[1].message.should.be.equal('review cannot be null');
//           done();
//         });
//     });
//   });
//   describe('Books get request', () => {
//     it('should list books', (done) => {
//       chai.request(app)
//         .get('/api/v1/users/books')
//         .set('x-token', token)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.should.be.json;
//           res.body[0].title.should.be.equal('Admin');
//           res.body[0].author.should.be.equal('Tosin');
//           res.body[0].category.should.be.equal('admin96');
//           res.body[0].image.should.be.equal('https://static.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg');
//           res.body[0].review.should.be.equal('Nice Book');
//           if (err) return expect(err);
//           done();
//         });
//     });
//     it('should not let users get books without token', (done) => {
//       chai.request(app)
//         .get('/api/v1/users/books')
//         .end((err, res) => {
//           res.should.have.status(403);
//           res.should.be.json;
//           res.body.error.should.be.equal('Unauthorised user');
//           done();
//         });
//     });
//   });
//   describe('Get 1 book request', () => {
//     it('should list a book', (done) => {
//       chai.request(app)
//         .get('/api/v1/books/1')
//         .set('x-token', token)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.should.be.json;
//           res.body.title.should.be.equal('Admin');
//           res.body.author.should.be.equal('Tosin');
//           res.body.category.should.be.equal('admin96');
//           res.body.image.should.be.equal('https://static.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg');
//           res.body.review.should.be.equal('Nice Book');
//           if (err) return expect(err);
//           done();
//         });
//     });
//     it('should not list a book without token', (done) => {
//       chai.request(app)
//         .get('/api/v1/books/1')
//         .end((err, res) => {
//           res.should.have.status(403);
//           res.should.be.json;
//           res.body.error.should.be.equal('Unauthorised user');
//           done();
//         });
//     });
//   });
//   describe('Borrow books action', () => {
//     it('should borrow books', (done) => {
//       chai.request(app)
//         .post('/api/v1/users/2/books')
//         .set('x-token', token)
//         .send({ bookId: 1 })
//         .end((err, res) => {
//           console.log(res)
//           res.should.have.status(200);
//           res.should.be.json;
//           // res.body.title.should.be.equal('Admin');
//           // res.body.author.should.be.equal('Tosin');
//           // res.body.category.should.be.equal('admin96');
//           // res.body.image.should.be.equal('https://static.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg');
//           // res.body.review.should.be.equal('Nice Book');
//           if (err) return expect(err);
//           done();
//         });
//     });
//     it('should not list a book without token', (done) => {
//       chai.request(app)
//         .get('/api/v1/users/2/history')
//         .end((err, res) => {
//           res.should.have.status(403);
//           res.should.be.json;
//           res.body.error.should.be.equal('Unauthorised user');
//           done();
//         });
//     });
//   });
//   describe('Get history of borrowed books', () => {
//     it('should get history of borrowed books', (done) => {
//       chai.request(app)
//         .get('/api/v1/users/2/history')
//         .set('x-token', token)
//         .end((err, res) => {
//           console.log(res)
//           res.should.have.status(200);
//           res.should.be.json;
//           // res.body.title.should.be.equal('Admin');
//           // res.body.author.should.be.equal('Tosin');
//           // res.body.category.should.be.equal('admin96');
//           // res.body.image.should.be.equal('https://static.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg');
//           // res.body.review.should.be.equal('Nice Book');
//           if (err) return expect(err);
//           done();
//         });
//     });
//     it('should not list a book without token', (done) => {
//       chai.request(app)
//         .get('/api/v1/users/2/history')
//         .end((err, res) => {
//           res.should.have.status(403);
//           res.should.be.json;
//           res.body.error.should.be.equal('Unauthorised user');
//           done();
//         });
//     });
//   });
// });
