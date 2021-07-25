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
	}
};

export default generateToken;
