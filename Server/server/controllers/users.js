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
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        membership: req.body.membership,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  login(req, res) {
    return Users
      .findOne({
        where: {
          userName: req.body.userName, // find user by username
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: 'User Not Found',
          });
        }
        else if (req.body.role === 'admin' && bcrypt.compareSync(req.body.password, user.password)) {
          // create Token
          const adminToken = jwt.sign({ user }, app.get('secret'), {
            expiresIn: 60 * 60 * 72 // token expires after 24 hours
          });
          return res.status(200).send({
            message: 'Welcome admin',
            userName: user.userName,
            role: user.role,
            userToken: adminToken
          });
        }
        else if (bcrypt.compareSync(req.body.password, user.password)) {
          // create Token
          const token = jwt.sign({ user }, app.get('secret'), {
            expiresIn: 60 * 60 * 24 // token expires after 24 hours
          });
          return res.status(200).send({
            message: 'Successfully logged in',
            role: user.role,
            userName: user.userName,
            userToken: token
          });
        }
        res.status(401).send({ error: 'Password Incorrect' });
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  }
};

export default usersController;

