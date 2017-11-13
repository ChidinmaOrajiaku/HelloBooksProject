import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import models from '../models';

import app from '../../app';

const Users = models.Users;
// const userValidator = (res) => {

// };
const usersController = {
  create(req, res) {
    const {
      firstname,
      lastname,
      username,
      password,
      email,
    } = req.body;
    // create user
    return Users
      .create({
        firstname,
        lastname,
        username,
        email,
        password
      })
      .then((user) => {
        res.status(201).send({
          message: 'Account created! Proceed to login',
          username: user.username,
        });
      })
      .catch((error) => {
        const errorMessage = error.errors.map(value => value.message);
        return res.status(400).send(errorMessage);
      });
  },
  login(req, res) {
    const { email, password } = req.body;
    return Users
      .findOne({
        where: {
          email
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: 'User Not Found',
          });
        } else if (email === process.env.ADMIN_EMAIL
          && bcrypt.compareSync(password, user.password)) {
          // create Token
          const adminToken = jwt.sign({
            username: process.env.ADMIN_NAME,
            role: 'admin',
            id: user.id }, app.get('secret'), {
            expiresIn: 60 * 60 * 72 // token expires after 72 hours
          });
          return res.status(200).send({
            message: 'Welcome admin',
            username: user.username,
            role: 'Admin',
            token: adminToken
          });
        } else if (bcrypt.compareSync(password, user.password)) {
          // create Token
          const userToken = jwt.sign({
            username: user.username,
            role: 'user',
            id: user.id
          },
          app.get('secret'),
          {
            expiresIn: 60 * 60 * 24 // token expires after 24 hours
          });
          return res.status(200).send({
            message: 'Successfully logged in',
            role: 'User',
            username: user.username,
            token: userToken
          });
        }
        res.status(401).send({ message: 'Password Incorrect' });
      })
      .catch((error) => {
        res.status(500).send({
          message: 'Sorry! An error occured and you cannot login',
          error
        });
      });
  },

  updatePassword(req, res) {
    // update books
    return Users
      .findById(req.params.usersId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        user.update({
          password: req.body.password,
        })
          .then(() => res.status(200).send({ message: 'Succesfully Updated' }))
          .catch((error) => {
            res.status(404).send(error);
          });
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  },
  getUser(req, res) {
    return Users
      .findById(req.params.usersId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        res.status(200).send(user);
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  },
  adminCountAllUser(req, res) {
    return Users
      .findAndCountAll({})
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }
};

export default usersController;

