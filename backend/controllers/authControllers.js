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

// @desc send data for req.user after passport login
// @route GET /api/auth/passport/login/data
// @access PUBLIC
const passportLoggedUser = (req, res) => {
	// res.json(this.user);
	console.log(req.user);
};

export { googleLoginSuccess, googleLoginFailure, passportLoggedUser };
