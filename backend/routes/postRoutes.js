import express from 'express';

import { createPost, editPost, removePost, viewPost, viewPosts } from '../controllers/post.js';
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/createpost', protect, createPost);

router.put('/:id', protect, editPost);

router.delete('/:id', protect, removePost);

router.get('/:id', protect, viewPost);

router.get('/', protect, viewPosts);

export default router;
