import express from 'express';
import {
	authUser,
	getUserProfile,
	getAccessToken,
	registerUser,
	confirmUser,
	mailForPasswordReset,
	resetUserPassword,
	updateUserProfile,
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

// @desc confirm the email address of the registered user
// @route GET /api/users/confirm
// @access PUBLIC
router.route('/confirm/:token').get(confirmUser);

// @desc send a mail with the link to reset password
// @route POST /api/users/reset
// @access PUBLIC
router.route('/reset').post(mailForPasswordReset);

// @desc reset password of any verified user
// @route PUT /api/users/reset
// @access PUBLIC
router.route('/reset').put(resetUserPassword);

// @desc obtain new access tokens using the refresh tokens
// @route GET /api/users/refresh
// @access PUBLIC
router.route('/refresh').post(getAccessToken);

// @desc get data for an authenticated user
// @route GET /api/users/profile
// @access PRIVATE
router.route('/profile').get(protectRoute, getUserProfile);

// @desc update data for an authenticated user
// @route PUT /api/users/profile
// @access PRIVATE
router
	.route('/profile')
	.get(protectRoute, getUserProfile)
	.put(protectRoute, updateUserProfile);

export default router;
