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
  firstname: 'Admin',
  lastname: 'Tosin',
  username: 'admin96',
  email: 'admin96@gmail.com',
  password: bcrypt.hashSync('1996', bcrypt.genSaltSync(10))
};

const password = bcrypt.hashSync('1995', bcrypt.genSaltSync(10));

let token = '';
let adminToken = '';

describe('Create User', () => {
  it('should let users sign up /signup POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.message.should.be.equal('Account created! Proceed to login');
        res.body.role.should.be.equal('User');
        if (err) return expect(err.message);
        done();
      });
  });
  it('should let users sign up /signup POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.message.should.be.equal('Succesfully signed up Admin');
        res.body.role.should.be.equal('Admin');
        if (err) return expect(err.message);
        done();
      });
  });
  it('should let users sign up /signup POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(admin)
      .end((err) => {
        err.should.have.status(400);
        done();
      });
  });
  it('should let users sign up /signup POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({ firstname: admin.firstname, lastname: admin.lastname, username: 'corajiaku', email: 'admin96@gmail.com', password: bcrypt.hashSync('1996', bcrypt.genSaltSync(10)) })
      .end((err) => {
        err.should.have.status(400);
        done();
      });
  });
  it('should let users sign up /signup POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({ firstname: admin.firstname, username: 'corajiaku', email: 'admin96mailcom', password: bcrypt.hashSync('1996', bcrypt.genSaltSync(10)) })
      .end((err) => {
        err.should.have.status(400);
        done();
      });
  });
});

describe('User sign in', () => {
  it('should let users sign in /signin POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        res.should.be.json;
        res.body.message.should.be.equal('Successfully logged in');
        res.body.username.should.be.equal(user.username);
        res.body.role.should.be.equal('User');
        if (err) return expect(err.message);
        done();
      });
  });
  it('should let users sign in /signin POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(admin)
      .end((err, res) => {
        adminToken = res.body.token;
        res.should.have.status(200);
        res.should.be.json;
        res.body.message.should.be.equal('Welcome admin');
        res.body.username.should.be.equal(admin.username);
        res.body.role.should.be.equal('Admin');
        if (err) return expect(err);
        done();
      });
  });
  it('should let users sign in /signin POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({ username: 'corajiaku', email: 'admin96mailcom', password: admin.password })
      .end((err) => {
        err.should.have.status(401);
        done();
      });
  });
});

describe('User get request', () => {
  it('should let users get details /users/:usersId get', (done) => {
    chai.request(app)
      .get('/api/v1/users/2')
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        if (err) return expect(err);
        done();
      });
  });
});

describe('User update password', () => {
  it('should let users update password /users/:usersId PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/users/${user.id}`)
      .send({ password })
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.message.should.be.equal('Succesfully Updated');
        if (err) return expect(err);
        done();
      });
  });
});

describe('Books create request', () => {
  it('should let users get details /users/:usersId get', (done) => {
    chai.request(app)
      .get('/api/v1/users/2')
      .set('x-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        if (err) return expect(err);
        done();
      });
  });
});
