/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // eslint-disable-next-line prefer-destructuring
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401).send({ message: 'Not authorized ,token failed ' });
    }
  }
  if (!token) {
    res.status(401).send({ message: 'Not authorized , no token' });
  }
};

const verified = (req, res, next) => {
  if (req.user && req.user.isVerified) {
    next();
  } else {
    res.status(401).send({ message: 'Not verified as a host' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Not authorized as an admin' });
  }
};

export { protect, verified, admin };
