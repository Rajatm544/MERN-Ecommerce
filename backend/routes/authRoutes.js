import express from 'express';
import {
	googleLoginSuccess,
	googleLoginFailure,
	githubLoginSuccess,
	githubLoginFailure,
	twitterLoginSuccess,
	twitterLoginFailure,
	linkedinLoginSuccess,
	linkedinLoginFailure,
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

// @desc login user using the github strategy
// @route GET /api/auth/github
// @access PUBLIC
router.route('/github').get(
	// googleLogin,
	passport.authenticate('github', {
		scope: ['user:email'],
	})
);

// @desc redirect route for the passport github strategy
// @route GET /api/auth/github/redirect
// @access PUBLIC
router.get(
	'/github/redirect',
	passport.authenticate('github', {
		successRedirect: '/api/auth/github/redirect/success',
		failureRedirect: '/api/auth/github/redirect/failure',
	})
);

// @desc redirect route for the passport github strategy
// @route GET /api/auth/github/redirect
// @access PUBLIC
router.route('/github/redirect/success').get(githubLoginSuccess);

// @desc redirect route for the passport github strategy
// @route GET /api/auth/github/redirect
// @access PUBLIC
router.route('/github/redirect/failure').get(githubLoginFailure);

// @desc redirect route for the passport twitter strategy
// @route GET /api/auth/twitter
// @access PUBLIC
router.route('/twitter').get(passport.authenticate('twitter'));

// @desc redirect route for the passport twitter strategy
// @route GET /api/auth/twitter/redirect
// @access PUBLIC
router.get(
	'/twitter/redirect',
	passport.authenticate('twitter', {
		successRedirect: '/api/auth/twitter/redirect/success',
		failureRedirect: '/api/auth/twitter/redirect/failure',
	})
);

// @desc redirect route for the passport twitter strategy
// @route GET /api/auth/twitter/redirect
// @access PUBLIC
router.route('/twitter/redirect/success').get(twitterLoginSuccess);

// @desc redirect route for the passport twitter strategy
// @route GET /api/auth/twitter/redirect
// @access PUBLIC
router.route('/twitter/redirect/failure').get(twitterLoginFailure);

// @desc redirect route for the passport linkedin strategy
// @route GET /api/auth/linkedin/
// @access PUBLIC
router.route('/linkedin').get(passport.authenticate('linkedin'));

// @desc redirect route for the passport linkedin strategy
// @route GET /api/auth/linkedin/redirect
// @access PUBLIC
router.get(
	'/linkedin/redirect',
	passport.authenticate('linkedin', {
		successRedirect: '/api/auth/linkedin/redirect/success',
		failureRedirect: '/api/auth/linkedin/redirect/failure',
	})
);

// @desc redirect route for the passport linkedin strategy
// @route GET /api/auth/linkedin/redirect
// @access PUBLIC
router.route('/linkedin/redirect/success').get(linkedinLoginSuccess);

// @desc redirect route for the passport linkedin strategy
// @route GET /api/auth/linkedin/redirect
// @access PUBLIC
router.route('/linkedin/redirect/failure').get(linkedinLoginFailure);

export default router;
