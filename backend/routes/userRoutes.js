import express from 'express';
import { authUser } from '../controllers/userControllers.js';

const router = express.Router();

// @desc authenticate user and get token
// @route POST /api/users/login
// @access PUBLIC
router.route('/login').post(authUser);

export default router;
