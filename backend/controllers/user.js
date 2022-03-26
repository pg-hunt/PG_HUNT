/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import User from '../models/userModel.js';

/**
 * @description returns profile details of the user currently loggedin
 * @access Private
 * @route  GET api/users/profile
 * @param  {}
 * @returns {email,name,phone,isAdmin,isVerified}
 */
const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      email: user.email,
      name: user.name,
      phone: user.phone,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

export { getMyProfile };
