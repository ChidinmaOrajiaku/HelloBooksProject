import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import models from '../models';

import app from '../../app';

const Users = models.Users;
const usersController = {
  create(req, res) {
    // create user
    return Users
      .create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })
      .then((user) => {
        if (user.username === 'admin96' && user.email === 'admin96@gmail.com') {
          return res.status(201).send({
            message: 'Succesfully signed up Admin',
            role: 'Admin'
          });
        }
        return res.status(201).send({
          message: 'Account created! Proceed to login',
          role: 'User'
        });
      })
      .catch((error) => {
        const errorMessage = error.errors.map((value) => value.message);
        res.status(400).send(errorMessage);
      });
  },
  login(req, res) {
    return Users
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: 'User Not Found',
          });
        } else if (req.body.email === 'admin96@gmail.com' && bcrypt.compareSync(req.body.password, user.password)) {
          // create Token
          const adminToken = jwt.sign({ username: 'admin96', role: 'admin', id: user.id }, app.get('secret'), {
            expiresIn: 60 * 60 * 72 // token expires after 72 hours
          });
          return res.status(200).send({
            message: 'Welcome admin',
            username: user.username,
            role: 'Admin',
            token: adminToken
          });
        } else if (bcrypt.compareSync(req.body.password, user.password)) {
          // create Token
          const userToken = jwt.sign({ username: user.username, role: 'user', id: user.id }, app.get('secret'), {
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
        res.status(404).send(error);
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

