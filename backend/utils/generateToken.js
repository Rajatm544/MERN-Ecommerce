import jwt from 'jsonwebtoken';

// generate a JWT token for the various applications represented by the 'option' argument
const generateToken = (id, option) => {
	if (option === 'access') {
		return jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
			expiresIn: 60 * 60, // 1 hour
		});
	} else if (option === 'refresh') {
		return jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN_SECRET, {
			expiresIn: '7d', // 7 days
		});
	} else if (option === 'email') {
		return jwt.sign({ id }, process.env.JWT_EMAIL_TOKEN_SECRET, {
			expiresIn: 60 * 15, // 15 minutes
		});
	} else if (option === 'forgot password') {
		return jwt.sign({ id }, process.env.JWT_FORGOT_PASSWORD_TOKEN_SECRET, {
			expiresIn: 60 * 10, // 10 minutes
		});
	}
};

export default generateToken;
