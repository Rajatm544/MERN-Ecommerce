import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// configure the transporter for nodemailer to use gmail account to send mails
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		type: 'OAuth2',
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASSWORD,
		clientId: process.env.OAUTH_CLIENT_ID,
		clientSecret: process.env.OAUTH_CLIENT_SECRET,
		refreshToken: process.env.OAUTH_REFRESH_TOKEN,
	},
});

export default transporter;
