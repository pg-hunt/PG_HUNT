/* eslint-disable import/extensions */
import express from 'express';
// eslint-disable-next-line import/extensions
import { login, registerUser, logout } from '../controllers/auth.js';

import { getMyProfile } from '../controllers/user.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', registerUser);
router.get('/logout', logout);
router.get('/profile', protect, getMyProfile);

export default router;
