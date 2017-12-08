import jwt from 'jsonwebtoken';
import app from '../../app';

const authenticate = {
  verifyUser: (req, res, next) => {
    // Let's request token
    const token = req.body.token || req.query.token || req.headers['x-token'];

    // if token not found, what?
    if (!token) {
      return res.status(401).send({
        error: 'Unauthorised user'
      });
    }

    // Token verification
    jwt.verify(token, app.get('secret'), (err, decoded) => {
      if (err) {
        return res.status(403).send({
          error: 'Token could not be authenticated'
        });
      }
      req.decoded = decoded;
      next();
    });
  },

  // For admin routes
  verifyAdmin: (req, res, next) => {
    if (req.decoded && req.decoded.username === process.env.ADMIN_NAME) {
      return next();
    }
    return res.status(403).send({
      message: 'Solely for the admin'
    });
  }
};

export default authenticate;

