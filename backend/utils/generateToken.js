import jwt from 'jsonwebtoken';

const generateToken = (id, option) => {
	if (option === 'access') {
		return jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
			expiresIn: 60 * 30,
		});
	} else if (option === 'refresh') {
		return jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN_SECRET, {
			expiresIn: '7d',
		});
	} else if (option === 'email') {
		return jwt.sign({ id }, process.env.JWT_EMAIL_TOKEN_SECRET, {
			expiresIn: 60 * 15,
		});
	} else if (option === 'forgot password') {
		return jwt.sign({ id }, process.env.JWT_FORGOT_PASSWORD_TOKEN_SECRET, {
			expiresIn: 60 * 5,
		});
	}
};

export default generateToken;
