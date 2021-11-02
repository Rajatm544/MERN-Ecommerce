import asyncHandler from 'express-async-handler';
import getAuthErrorCode from '../utils/getAuthErrorCode.js';

// To redirect to some route caught by the react router in the frontend, after successfully logging in
const frontendURL = process.env.FRONTEND_BASE_URL;

// controller for the routes that handle the success redirects from all 4 passport strategies
const passportLoginSuccess = asyncHandler(async (req, res) => {
	res.redirect(`${frontendURL}/login?login=success&id=${req.user._id}`);
});

// controller for the routes that handle the failure redirects from all 4 passport strategies
const passportLoginFailure = asyncHandler(async (req, res) => {
	const errorMsg = req.flash('error')[0];
	const errorCode = getAuthErrorCode(errorMsg);
	res.redirect(`${frontendURL}/login?login=failed&errorCode=${errorCode}`);
});

export { passportLoginSuccess, passportLoginFailure };
