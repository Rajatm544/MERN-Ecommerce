import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc authenticate user and get token
// @route POST /api/users/login
// @access PUBLIC
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			id: user._id,
			email: user.email,
			name: user.name,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error(user ? 'Invalid Password' : 'Invalid email');
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
			name: user.name,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(400);
		throw new Error('User not authorised to view this page');
	}
});

export { authUser, getUserProfile };
