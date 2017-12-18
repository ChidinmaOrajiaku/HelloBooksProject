import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import models from '../models';

import app from '../../app';

import messages from '../utils/messages';

import * as validateId from '../utils/validateId';

const Users = models.Users;

const usersController = {
  /**
   * 
   * Creates a user in the database
   * @param {string} req 
   * @param {string} res 
   * @returns {object} req, res
   */
  create(req, res) {
    const {
      firstname,
      lastname,
      username,
      password,
      email,
    } = req.body;

    return Users
      .create({
        firstname,
        lastname,
        username,
        email,
        password,
      })
      .then((user) => {
        res.status(201).send({
          message: 'Account created! Proceed to login',
          username: user.firstname,
        });
      })
      .catch((error) => {
        const errorMessage = error.errors.map(value => value.message);
        return res.status(400).send(errorMessage);
      });
  },
  /**
 * 
 * Returns  User  and provides user/admin token on login
 * @param {string} req 
 * @param {string} res 
 * @returns {object} req, res
 */
  login(req, res) {
    const {
      email,
      password
    } = req.body;
    return Users
      .findOne({
        where: {
          email
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: messages.notFound
          });
        } else if (email === process.env.ADMIN_EMAIL
            && bcrypt.compareSync(password, user.password)) {
          // create Token
          const adminToken = jwt.sign({
            username: process.env.ADMIN_NAME,
            role: 'admin',
            id: user.id },
          app.get('secret'),
          {
            expiresIn: 60 * 60 * 72 // token expires after 72 hours
          });
          return res.status(200).send({
            message: 'Welcome admin',
            username: user.username,
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
            username: user.username,
            token: userToken
          });
        }
        res.status(401).send({
          message: messages.incorrectPassword
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: 'Sorry! An error occured and you cannot login',
          error
        });
      });
  },
  /**
   * 
   * Updates user password
   * @param {string} req 
   * @param {string} res 
   * @returns {object} req, res
   */
  updatePassword(req, res) {
    const userReturnedId = validateId.validate(req.params.userId);
    if (isNaN(userReturnedId)) {
      return res.status(400).send({
        message: messages.invalidId
      });
    }
    // update password
    const {
      verifyPassword,
      password } = req.body;
    return Users
      .findById(userReturnedId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: messages.notFound,
          });
        } else if (bcrypt.compareSync(verifyPassword, user.password)) {
          user.update({
            password,
          });
          return res.status(200).send({
            message: 'Succesfully Updated'
          });
        }
        res.status(401).send({
          message: messages.incorrectPassword
        });
      })
      .catch((error) => {
        res.status(500).send({
          messages: 'An error occured and password could not be updated',
          error
        });
      });
  },
  /**
       * 
       * Gets user details
       * @param {string} req 
       * @param {string} res 
       * @returns {object} req, res
       */
  getUser(req, res) {
    const userReturnedId = validateId.validate(req.params.userId);
    if (isNaN(userReturnedId)) {
      return res.status(400).send({
        message: messages.invalidId
      });
    }
    return Users
      .findById(userReturnedId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: messages.notFound,
          });
        }
        const {
          firstname,
          lastname,
          email,
          username
        } = user;
        return res.status(200).send({
          firstname,
          lastname,
          email,
          username,
        });
      })
      .catch((error) => {
        res.status(500).send({
          messages: messages.generalError,
          error
        });
      });
  },
  /**
     * 
     * Returns  User count
     * @param {string} req 
     * @param {string} res 
     * @returns {object} req, res
     */
  adminCountAllUser(req, res) {
    return Users
      .findAndCountAll({})
      .then((user) => {
        res.status(200).send({
          count: user.count
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: messages.generalError,
          error
        });
      });
  }
};

export default usersController;

