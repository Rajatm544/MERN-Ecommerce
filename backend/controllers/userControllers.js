import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Token from '../models/tokenModel.js';
import generateToken from '../utils/generateToken.js';
import sendMail from '../utils/sendMail.js';
import jwt from 'jsonwebtoken';

// @desc authenticate user and get token
// @route POST /api/users/login
// @access PUBLIC
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	let user = await User.findOne({ email });
	const accessToken = generateToken(user._id, 'access');
	const refreshToken = generateToken(user._id, 'refresh');

	if (user && (await user.matchPassword(password))) {
		if (user.isConfirmed) {
			const existingToken = await Token.findOne({ email });
			if (!existingToken) {
				const newToken = await Token.create({
					email,
					token: refreshToken,
				});
			} else {
				existingToken.token = refreshToken;
				existingToken.save();
			}

			res.json({
				id: user._id,
				email: user.email,
				name: user.name,
				isAdmin: user.isAdmin,
				isConfirmed: user.isConfirmed,
				accessToken,
				refreshToken,
			});
		} else {
			res.json({
				message: 'Please confirm you email',
			});
		}
	} else {
		res.status(401);
		throw new Error(user ? 'Invalid Password' : 'Invalid email');
	}
});

// @desc register a new user
// @route POST /api/users/
// @access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('Email already registered');
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	// if user was created successfully
	if (user) {
		await sendMail(user._id, email, 'email verification');

		const refreshToken = generateToken(user._id, 'refresh');
		res.status(201).json({
			id: user._id,
			email: user.email,
			name: user.name,
			isAdmin: user.isAdmin,
			isConfirmed: user.isConfirmed,
			accessToken: generateToken(user._id, 'access'),
			refreshToken,
			// emailToken,
		});
	} else {
		res.status(400);
		throw new Error('User not created');
	}
});

// @desc send a mail with the link to verify mail
// @route POST /api/users/confirm
// @access PUBLIC

const mailForEmailVerification = asyncHandler(async (req, res) => {
	try {
		const { email } = req.body;

		const user = await User.findOne({ email });

		if (user) {
			if (!user.isConfirmed) {
				// send the mail
				await sendMail(user._id, email, 'email verification');
				res.status(201).json({
					id: user._id,
					email: user.email,
					name: user.name,
					isAdmin: user.isAdmin,
					isConfirmed: user.isConfirmed,
				});
			} else {
				res.status(400);
				throw new Error('User already confirmed');
			}
		}
	} catch (error) {
		console.log(error);
		res.status(401);
		throw new Error('Could not send the mail. Please retry.');
	}
});

// @desc send a mail with the link to reset password
// @route POST /api/users/reset
// @access PUBLIC

const mailForPasswordReset = asyncHandler(async (req, res) => {
	try {
		const { email } = req.body;

		const user = await User.findOne({ email });

		if (user && user.isConfirmed) {
			// send the mail and return the user details

			await sendMail(user._id, email, 'forgot password');

			res.status(201).json({
				id: user._id,
				email: user.email,
				name: user.name,
				isAdmin: user.isAdmin,
				isConfirmed: user.isConfirmed,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(401);
		throw new Error('Could not send the mail. Please retry.');
	}
});

// @desc reset password of any verified user
// @route PUT /api/users/reset
// @access PUBLIC

const resetUserPassword = asyncHandler(async (req, res) => {
	try {
		const { passwordToken, password } = req.body;
		const decodedToken = jwt.verify(
			passwordToken,
			process.env.JWT_FORGOT_PASSWORD_TOKEN_SECRET
		);
		const user = await User.findById(decodedToken.id);

		if (user && password) {
			user.password = password;
			const updatedUser = await user.save();

			if (updatedUser) {
				res.status(200).json({
					id: updatedUser._id,
					email: updatedUser.email,
					name: updatedUser.name,
					isAdmin: updatedUser.isAdmin,
				});
			} else {
				res.status(401);
				throw new Error('Unable to update password');
			}
		}
	} catch (error) {
		res.status(400);
		throw new Error('User not found.');
	}
});

// @desc confirm the email address of the registered user
// @route GET /api/users/confirm
// @access PUBLIC

const confirmUser = asyncHandler(async (req, res) => {
	try {
		const emailToken = req.params.token;
		const decodedToken = jwt.verify(
			emailToken,
			process.env.JWT_EMAIL_TOKEN_SECRET
		);
		const user = await User.findById(decodedToken.id).select('-password');
		user.isConfirmed = true;
		const updatedUser = await user.save();
		res.json({
			id: updatedUser._id,
			email: updatedUser.email,
			name: updatedUser.name,
			isAdmin: updatedUser.isAdmin,
			isConfirmed: updatedUser.isConfirmed,
			accessToken: updatedUser.accessToken,
			refreshToken: updatedUser.refreshToken,
		});
	} catch (error) {
		console.log(error);
		res.status(401);
		throw new Error('Not authorised. Token failed');
	}
});

// @desc obtain new access tokens using the refresh tokens
// @route GET /api/users/refresh
// @access PUBLIC

const getAccessToken = asyncHandler(async (req, res) => {
	const refreshToken = req.body.token;
	const email = req.body.email;

	// search if currently loggedin user has the refreshToken sent
	const currentAccessToken = await Token.findOne({ email });

	if (!refreshToken || refreshToken !== currentAccessToken.token) {
		res.status(400);
		throw new Error('Refresh token not found, login again');
	}

	// If the refresh token is valid, create a new accessToken and return it.
	jwt.verify(
		refreshToken,
		process.env.JWT_REFRESH_TOKEN_SECRET,
		(err, user) => {
			if (!err) {
				const accessToken = generateToken(user.id, 'access');
				return res.json({ success: true, accessToken });
			} else {
				return res.json({
					success: false,
					message: 'Invalid refresh token',
				});
			}
		}
	);
});

// @desc get data for an authenticated user
// @route GET /api/users/profile
// @access PRIVATE

const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);
	if (user) {
		res.json({
			id: user._id,
			email: user.email,
			name: user.name,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(400);
		throw new Error('User not authorised to view this page');
	}
});

// @desc update data for an authenticated user
// @route PUT /api/users/profile
// @access PRIVATE

const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}
		const updatedUser = await user.save();

		if (updatedUser) {
			const refreshToken = generateToken(updatedUser._id, 'refresh');
			const existingToken = await Token.findOne({
				email: updatedUser.email,
			});
			if (existingToken) {
				existingToken.token = refreshToken;
				existingToken.save();
			} else {
				Token.create({
					user: updatedUser._id,
					token: refreshToken,
				});
			}
			res.json({
				id: updatedUser._id,
				email: updatedUser.email,
				name: updatedUser.name,
				isAdmin: updatedUser.isAdmin,
				accessToken: generateToken(updatedUser._id, 'access'),
				refreshToken,
			});
		}
	} else {
		res.status(400);
		throw new Error('User not found.');
	}
});

export {
	authUser,
	getUserProfile,
	getAccessToken,
	registerUser,
	confirmUser,
	mailForEmailVerification,
	mailForPasswordReset,
	resetUserPassword,
	updateUserProfile,
};
