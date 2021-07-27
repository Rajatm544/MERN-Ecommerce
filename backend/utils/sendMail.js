import dotenv from 'dotenv';
import transporter from '../utils/transporter.js';
import generateToken from '../utils/generateToken.js';

dotenv.config();

const sendMail = async (id, email, option) => {
	if (option === 'email verification') {
		// create a new JWT to verify user via email
		const emailToken = generateToken(id, 'email');
		const url = `http://localhost:3000/user/confirm/${emailToken}`;
		const mailOptions = {
			from: process.env.EMAIL, // sender address
			to: email,
			subject: 'Confirm your email for Kosells', // Subject line
			html: `<p>
					Click this link to 
					<a href="${url}">verify your account</a>
				</p>
				
			`,
		};

		const mailSent = await transporter.sendMail(
			mailOptions,
			(err, info) => {
				if (err) {
					console.log(err);
				} else {
					console.log(info);
				}
			}
		);

		if (mailSent) return Promise.resolve(1);
	} else if (option === 'forgot password') {
		// create a new JWT to verify user via email
		const forgetPasswordToken = generateToken(id, 'forgot password');
		const url = `http://localhost:3000/user/password/reset/${forgetPasswordToken}`;
		const mailOptions = {
			from: process.env.EMAIL, // sender address
			to: email,
			subject: 'Reset Password for Kosells', // Subject line
			html: `<p>
					Forgot your password? No worries! Just click this link to 
					<a href="${url}">reset your password</a>. 
					<br><br><br>
					
					Note that this link is valid for only the next 5 minutes. 
				</p>
				
			`,
		};

		const mailSent = await transporter.sendMail(
			mailOptions,
			(err, info) => {
				if (err) {
					console.log(err);
				} else {
					console.log(info);
				}
			}
		);

		if (mailSent) return Promise.resolve(1);
	}
};

export default sendMail;
