import express from 'express';
import {
	googleLoginSuccess,
	googleLoginFailure,
	passportLoggedUser,
} from '../controllers/authControllers.js';
import passport from 'passport';

const router = express.Router();

// @desc login user using the google strategy
// @route GET /api/auth/google
// @access PUBLIC
router.route('/google').get(
	// googleLogin,
	passport.authenticate('google', {
		scope: ['profile', 'email'],
	})
);

// @desc redirect route for the passport google strategy
// @route GET /api/auth/google/redirect
// @access PUBLIC
router.get(
	'/google/redirect',
	passport.authenticate('google', {
		successRedirect: '/api/auth/google/redirect/success',
		failureRedirect: '/api/auth/google/redirect/failure',
	})
);

// @desc redirect route for the passport google strategy
// @route GET /api/auth/google/redirect
// @access PUBLIC
router.route('/google/redirect/success').get(googleLoginSuccess);

// @desc redirect route for the passport google strategy
// @route GET /api/auth/google/redirect
// @access PUBLIC
router.route('/google/redirect/failure').get(googleLoginFailure);

export default router;
