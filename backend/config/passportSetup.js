import passport from 'passport';
import dotenv from 'dotenv';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/userModel.js';

dotenv.config();

const setupPassport = () => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id)
			.then((user) => done(null, user))
			.catch((err) => console.log(`${err}`.bgRed.bold));
	});

	passport.use(
		new GoogleStrategy(
			{
				// options for the google strategy
				clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
				clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
				callbackURL: 'http://localhost:5000/api/auth/google/redirect',
			},
			(accessToken, refreshToken, profile, done) => {
				User.findOne({ googleID: profile.id }).then((foundUser) => {
					if (!foundUser) {
						User.create({
							name: profile.displayName,
							isAdmin: false,
							isConfirmed: profile._json.email_verified,
							googleID: profile.id,
							email: profile._json.email,
						}).then((user) => {
							// console.log('User created ', user);
							done(null, user);
						});
					} else {
						done(null, foundUser);
						// console.log('User exists ', foundUser);
					}
				});
			}
		)
	);
};

export default setupPassport;
