import asyncHandler from 'express-async-handler';

// @desc login user using the google strategy
// @route GET /api/auth/google/redirect/success
// @access PUBLIC
const googleLoginSuccess = asyncHandler(async (req, res) => {
	// console.log(req.user);
	// res.send('success');
	res.redirect(
		`http://localhost:3000/login?login=success&id=${req.user._id}`
	);
});

// @desc login user using the google strategy
// @route GET /api/auth/google/redirect/failure
// @access PUBLIC
const googleLoginFailure = asyncHandler(async (req, res) => {
	res.send('failed');
});

// @desc login user using the github strategy
// @route GET /api/auth/github/redirect/success
// @access PUBLIC
const githubLoginSuccess = asyncHandler(async (req, res) => {
	// console.log(req.user);
	// res.send('success');
	res.redirect(
		`http://localhost:3000/login?login=success&id=${req.user._id}`
	);
});

// @desc login user using the github strategy
// @route GET /api/auth/github/redirect/failure
// @access PUBLIC
const githubLoginFailure = asyncHandler(async (req, res) => {
	res.send('failed');
});

// @desc login user using the twitter strategy
// @route GET /api/auth/twitter/redirect/success
// @access PUBLIC
const twitterLoginSuccess = asyncHandler(async (req, res) => {
	res.redirect(
		`http://localhost:3000/login?login=success&id=${req.user._id}`
	);
});

// @desc login user using the twitter strategy
// @route GET /api/auth/twitter/redirect/failure
// @access PUBLIC
const twitterLoginFailure = asyncHandler(async (req, res) => {
	res.send('failed');
});

export {
	googleLoginSuccess,
	googleLoginFailure,
	githubLoginSuccess,
	githubLoginFailure,
	twitterLoginSuccess,
	twitterLoginFailure,
};
