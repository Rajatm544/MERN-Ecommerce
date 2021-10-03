import asyncHandler from 'express-async-handler';

const frontendURL = process.env.BASE_URL;

// @desc login user using the google strategy
// @route GET /api/auth/google/redirect/success
// @access PUBLIC
const googleLoginSuccess = asyncHandler(async (req, res) => {
	// console.log(req.user);
	// res.send('success');
	res.redirect(`${frontendURL}/login?login=success&id=${req.user._id}`);
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
	res.redirect(`${frontendURL}/login?login=success&id=${req.user._id}`);
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
	res.redirect(`${frontendURL}/login?login=success&id=${req.user._id}`);
});

// @desc login user using the twitter strategy
// @route GET /api/auth/twitter/redirect/failure
// @access PUBLIC
const twitterLoginFailure = asyncHandler(async (req, res) => {
	res.send('failed');
});

// @desc login user using the linkedin strategy
// @route GET /api/auth/linkedin/redirect/success
// @access PUBLIC
const linkedinLoginSuccess = asyncHandler(async (req, res) => {
	res.redirect(`${frontendURL}/login?login=success&id=${req.user._id}`);
});

// @desc login user using the linkedin strategy
// @route GET /api/auth/linkedin/redirect/failure
// @access PUBLIC
const linkedinLoginFailure = asyncHandler(async (req, res) => {
	res.send('failed');
});

export {
	googleLoginSuccess,
	googleLoginFailure,
	githubLoginSuccess,
	githubLoginFailure,
	twitterLoginSuccess,
	twitterLoginFailure,
	linkedinLoginSuccess,
	linkedinLoginFailure,
};
