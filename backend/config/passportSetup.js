import passport from 'passport';
import dotenv from 'dotenv';
import GoogleStrategy from 'passport-google-oauth20';
import GithubStrategy from 'passport-github2';
import TwitterStrategy from 'passport-twitter';
import LinkedInStrategy from 'passport-linkedin-oauth2';
import User from '../models/userModel.js';
import generateGravatar from '../utils/generateGravatar.js';

dotenv.config();
const backendURL = process.env.BACKEND_BASE_URL;
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
				callbackURL: `${backendURL}/api/auth/google/redirect`,
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
							avatar: generateGravatar(profile._json.email),
						}).then((user) => {
							done(null, user);
						});
					} else {
						done(null, foundUser);
					}
				});
			}
		)
	);

	passport.use(
		new GithubStrategy(
			{
				clientID: process.env.GITHUB_CLIENT_ID,
				clientSecret: process.env.GITHUB_CLIENT_SECRET,
				callbackURL: `${backendURL}/api/auth/github/redirect`,
			},
			(accessToken, refreshToken, profile, done) => {
				User.findOne({ githubID: profile.id }).then((foundUser) => {
					if (!foundUser) {
						User.create({
							name: profile.displayName,
							isAdmin: false,
							isConfirmed: !!profile._json.email,
							githubID: profile.id,
							avatar: generateGravatar(profile._json.email),
							email: profile._json.email,
						}).then((user) => {
							done(null, user);
						});
					} else {
						done(null, foundUser);
					}
				});
			}
		)
	);
};

passport.use(
	new TwitterStrategy(
		{
			consumerKey: process.env.TWITTER_CONSUMER_KEY,
			consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
			callbackURL: `${backendURL}/api/auth/twitter/redirect`,
			includeEmail: true,
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ twitterID: profile.id }).then((foundUser) => {
				if (!foundUser) {
					User.create({
						name: profile.displayName,
						isAdmin: false,
						isConfirmed: true,
						twitterID: profile.id,
						avatar: generateGravatar(profile._json.email),
						email: profile._json.email,
					}).then((user) => {
						done(null, user);
					});
				} else {
					done(null, foundUser);
				}
			});
		}
	)
);

passport.use(
	new LinkedInStrategy.Strategy(
		{
			clientID: process.env.LINKEDIN_CLIENT_ID,
			clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
			callbackURL: `${backendURL}/api/auth/linkedin/redirect`,
			scope: ['r_emailaddress', 'r_liteprofile'],
			state: true,
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ linkedinID: profile.id }).then((foundUser) => {
				if (!foundUser) {
					User.create({
						name: profile.displayName,
						isAdmin: false,
						isConfirmed: true,
						linkedinID: profile.id,
						email: profile.emails[0].value,
						avatar: generateGravatar(profile.emails[0].value),
					}).then((user) => {
						done(null, user);
					});
				} else {
					done(null, foundUser);
				}
			});
		}
	)
);

export default setupPassport;
