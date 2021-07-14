import express from 'express';
import {
	authUser,
	getUserProfile,
	registerUser,
} from '../controllers/userControllers.js';
import protectRoute from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc register a new user
// @route POST /api/users/
// @access PUBLIC
router.route('/').post(registerUser);

// @desc authenticate user and get token
// @route POST /api/users/login
// @access PUBLIC
router.route('/login').post(authUser);

// @desc get data for an authenticated user
// @route GET /api/users/profile
// @access PRIVATE
router.route('/profile').get(protectRoute, getUserProfile);

export default router;
