import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Token from '../models/tokenModel.js';
import generateToken from '../utils/generateToken.js';
import sendMail from '../utils/sendMail.js';
import generateGravatar from '../utils/generateGravatar.js';
import jwt from 'jsonwebtoken';

// @desc Get all the users info
// @route GET /api/users
// @access PRIVATE/ADMIN
const getAllUsers = asyncHandler(async (req, res) => {
	const page = Number(req.query.pageNumber) || 1; // the current page number in the pagination
	const pageSize = 20; // total number of entries on a single page
	const count = await User.countDocuments({}); // total number of documents available
	// const count = await Order.countDocuments({}); // total number of documents available

	// find all orders that need to be sent for the current page, by skipping the documents included in the previous pages
	// and limiting the number of documents included in this request
	// sort this in desc order that the document was created at
	const allUsers = await User.find({})
		.limit(pageSize)
		.skip(pageSize * (page - 1))
		.sort('-createdAt');

	// send the list of orders, current page number, total number of pages available
	res.json({
		users: allUsers,
		page,
		pages: Math.ceil(count / pageSize),
		total: count,
	});
});

// @desc Delete a user
// @route DELETE /api/users/:id
// @access PRIVATE/ADMIN
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		await user.remove();
		res.json({
			message: 'User removed from DB',
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc get user by ID
// @route GET /api/users/:id
// @access PRIVATE/ADMIN
const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');
	if (user) res.json(user);
	else {
		res.status(404);
		throw new Error('User does not exist');
	}
});

// @desc update user from the admin panel
// @route PUT /api/users/:id
// @access PRIVATE/ADMIN
const updateUser = asyncHandler(async (req, res) => {
	// do not include the hashed password when fetching this user
	const user = await User.findById(req.params.id).select('-password');
	if (user) {
		// update whicever field was sent in the rquest body
		user.name = req.body.name || user.name;
		user.isConfirmed = req.body.email === user.email;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin;
		const updatedUser = await user.save();
		if (updatedUser) {
			res.json({
				id: updatedUser._id,
				email: updatedUser.email,
				name: updatedUser.name,
				isAdmin: updatedUser.isAdmin,
				isConfirmed: updatedUser.isConfirmed,
			});
		}
	} else {
		res.status(400);
		throw new Error('User not found.');
	}
});

// @desc authenticate user and get token
// @route POST /api/users/login
// @access PUBLIC
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	let user = await User.findOne({ email });
	// generate both the access and the refresh tokens
	const accessToken = generateToken(user._id, 'access');
	const refreshToken = generateToken(user._id, 'refresh');

	// if the passwords are matching, then check if a refresh token exists for this user
	if (user && (await user.matchPassword(password))) {
		const existingToken = await Token.findOne({ email });
		// if no refresh token available, create one and store it in the db
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
			avatar: user.avatar,
			accessToken,
			refreshToken,
		});
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

	// the gravatar will be unique for each registered email
	const avatar = generateGravatar(email);

	const user = await User.create({
		name,
		email,
		password,
		avatar,
	});

	// if user was created successfully
	if (user) {
		// send a mail for email verification of the newly registred email id
		await sendMail(user._id, email, 'email verification');

		const refreshToken = generateToken(user._id, 'refresh');
		res.status(201).json({
			id: user._id,
			email: user.email,
			name: user.name,
			avatar,
			isAdmin: user.isAdmin,
			isConfirmed: user.isConfirmed,
			accessToken: generateToken(user._id, 'access'),
			refreshToken,
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
		// console.log(user);
		if (user) {
			// send a verification email, if this user is not a confirmed email
			if (!user.isConfirmed) {
				// send the mail
				await sendMail(user._id, email, 'email verification');
				res.status(201).json({
					id: user._id,
					email: user.email,
					name: user.name,
					isAdmin: user.isAdmin,
					avatar: user.avatar,
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

		// send a link to reset password only if it's a confirmed account
		if (user && user.isConfirmed) {
			// send the mail and return the user details

			// the sendMail util function takes a 3rd argument to indicate what type of mail to send
			await sendMail(user._id, email, 'forgot password');

			res.status(201).json({
				id: user._id,
				email: user.email,
				name: user.name,
				isAdmin: user.isAdmin,
				avatar: user.avatar,
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
		// update the user password if the jwt is verified successfully
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
					avatar: updatedUser.avatar,
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
		// set the user to a confirmed status, once the corresponding JWT is verified correctly
		const emailToken = req.params.token;
		const decodedToken = jwt.verify(
			emailToken,
			process.env.JWT_EMAIL_TOKEN_SECRET
		);
		const user = await User.findById(decodedToken.id).select('-password');
		user.isConfirmed = true;
		const updatedUser = await user.save();
		const foundToken = await Token.findOne({ email: updatedUser.email }); // send the refresh token that was stored
		res.json({
			id: updatedUser._id,
			email: updatedUser.email,
			name: updatedUser.name,
			isAdmin: updatedUser.isAdmin,
			avatar: updatedUser.avatar,
			isConfirmed: updatedUser.isConfirmed,
			accessToken: generateToken(user._id, 'access'),
			refreshToken: foundToken,
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

// @desc get user data for google login in the frontend
// @route POST /api/users/passport/data
// @access PUBLIC
const getUserData = asyncHandler(async (req, res) => {
	const { id } = req.body;
	const user = await User.findById(id);
	if (user) {
		res.json({
			id: user._id,
			email: user.email,
			name: user.name,
			avatar: user.avatar,
			isAdmin: user.isAdmin,
			isConfirmed: user.isConfirmed,
		});
	} else {
		res.status(400);
		throw new Error('User not authorised to view this page');
	}
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
			avatar: user.avatar,
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
		// update whichever field is sent in the req body
		user.name = req.body.name || user.name;
		user.avatar = req.body.avatar || user.avatar;
		if (req.body.email) user.isConfirmed = req.body.email === user.email;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		// check if the current user logged in is with a social account, in which case do not create/find any access or refresh tokens
		const isSocialLogin =
			updatedUser.googleID ||
			updatedUser.linkedinID ||
			updateUser.githubID ||
			updatedUser.twitterID;

		let updatedUserObj = {
			id: updatedUser._id,
			email: updatedUser.email,
			name: updatedUser.name,
			avatar: updatedUser.avatar,
			isAdmin: updatedUser.isAdmin,
			isConfirmed: updatedUser.isConfirmed,
		};

		if (updatedUser) {
			if (!isSocialLogin) {
				const refreshToken = generateToken(updatedUser._id, 'refresh');
				const existingToken = await Token.findOne({
					email: updatedUser.email,
				});
				// store a new refresh token for this email
				if (existingToken) {
					existingToken.token = refreshToken;
					existingToken.save();
				} else {
					Token.create({
						user: updatedUser._id,
						token: refreshToken,
					});
				}
				// add these two token to the response
				updatedUserObj = {
					...updatedUserObj,
					accessToken: generateToken(updatedUser._id, 'access'),
					refreshToken,
				};
			}
			res.json(updatedUserObj);
		}
	} else {
		res.status(400);
		throw new Error('User not found.');
	}
});

export {
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
};
