import express from 'express';
import {
	authUser,
	getUserProfile,
	getUserData,
	getAccessToken,
	registerUser,
	confirmUser,
	mailForEmailVerification,
	mailForPasswordReset,
	resetUserPassword,
	updateUserProfile,
	getAllUsers,
	deleteUser,
	getUserById,
	updateUser,
} from '../controllers/userControllers.js';
import { protectRoute, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc register a new user & get all users if admin
// @route POST /api/users/
// @access PUBLIC || PRIVATE?ADMIN
router.route('/').post(registerUser).get(protectRoute, isAdmin, getAllUsers);

// @desc authenticate user and get token
// @route POST /api/users/login
// @access PUBLIC
router.route('/login').post(authUser);

// @desc confirm the email address of the registered user
// @route GET /api/users/confirm
// @access PUBLIC
router.route('/confirm/:token').get(confirmUser);

// @desc send a mail with the link to verify mail, to be used if the user forgot to verify mail after registration
// @route POST /api/users/confirm
// @access PUBLIC
router.route('/confirm').post(mailForEmailVerification);

// @desc send a mail with the link to reset password
// @route POST /api/users/reset
// and
// @desc reset password of any verified user
// @route PUT /api/users/reset

// @access PUBLIC
router.route('/reset').post(mailForPasswordReset).put(resetUserPassword);

// @desc obtain new access tokens using the refresh tokens
// @route GET /api/users/refresh
// @access PUBLIC
router.route('/refresh').post(getAccessToken);

// @desc get data for an authenticated user, and update data for an authenticated user
// @route PUT & GET /api/users/profile
// @access PRIVATE
router
	.route('/profile')
	.get(protectRoute, getUserProfile)
	.put(protectRoute, updateUserProfile);

// @desc get user data for google login in the frontend
// @route POST /api/users/passport/data
// @access PUBLIC
router.route('/passport/data').post(getUserData);

// @desc Delete a user, get a user by id, update the user
// @route DELETE /api/users/:id
// @access PRIVATE/ADMIN
router
	.route('/:id')
	.delete(protectRoute, isAdmin, deleteUser)
	.get(protectRoute, isAdmin, getUserById)
	.put(protectRoute, isAdmin, updateUser);

export default router;
