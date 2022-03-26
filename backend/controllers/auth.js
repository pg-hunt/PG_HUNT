/* eslint-disable import/extensions */
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        phone: user.phone,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    res.status(400);
    throw new Error(`Something went wrong ${error}`);
  }
};

// @desc    Regsiter new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { email, name, password, phone } = req.body;
  const userExists = await User.findOne({
    $or: [{ email: email }, { name: name }],
  });
  if (userExists) {
    res.status(400);
    throw new Error('name or Email already exists');
  }

  const user = await User.create({
    email: email,
    phone: phone,
    name: name,
    password: password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      phone: user.phone,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

// logout
const logout = (req, res) => {
  res.clearCookie('token');
  res.send('User logout Route');
  res.json({
    message: 'User logout Successfully',
  });
};

export { login, registerUser, logout };
