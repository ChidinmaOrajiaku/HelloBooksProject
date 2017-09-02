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
        usersId: req.query.id,
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
        const errorMessage = error.errors.map((value) => {
          return value.message;
        });
        res.status(400).send(errorMessage);
      });
  },
  login(req, res) {
    return Users
      .findOne({
        where: {
          username: req.body.username, // find user by username
          email: req.body.email
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: 'User Not Found',
          });
        }
        else if (req.body.username === 'admin96' && req.body.email === 'admin96@gmail.com' && bcrypt.compareSync(req.body.password, user.password)) {
          // create Token
          const adminToken = jwt.sign({ username: 'admin96' }, app.get('secret'), {
            expiresIn: 60 * 60 * 72 // token expires after 72 hours
          });
          return res.status(200).send({
            message: 'Welcome admin',
            username: user.username,
            role: 'Admin',
            token: adminToken
          });
        }
        else if (req.body.username === user.username && bcrypt.compareSync(req.body.password, user.password)) {
          // create Token
          const token = jwt.sign({ username: user.username }, app.get('secret'), {
            expiresIn: 60 * 60 * 24 // token expires after 24 hours
          });
          return res.status(200).send({
            message: 'Successfully logged in',
            role: 'User',
            username: user.username,
            userToken: token
          });
        }
        res.status(401).send({ message: 'Password Incorrect' });
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  }
};

export default usersController;

