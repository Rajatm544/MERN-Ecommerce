const passportProtectRoute = (req, res, next) => {
	console.log(req.user);
	console.log('from here');
	if (!req.user) {
		res.status(401);
		throw new Error('Not authorized, no user object available');
	} else {
		next();
	}
};

export default passportProtectRoute;
