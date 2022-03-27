import express from 'express';

import { createPost, editPost, removePost, viewPost, viewPosts, searchPosts } from '../controllers/post.js';
import { protect, verified } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/createpost', protect, verified, createPost);

router.put('/:id', protect, verified, editPost);

router.delete('/:id', protect, verified, removePost);

router.get('/:id', protect, viewPost);

router.get('/', protect, verified, viewPosts);

router.post('/search', protect, searchPosts);

export default router;
