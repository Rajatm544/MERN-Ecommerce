import dotenv from 'dotenv';
import transporter from '../utils/transporter.js';
import generateToken from '../utils/generateToken.js';

dotenv.config();

const sendMail = async (id, email) => {
	// create a new JWT to verify user via email
	const emailToken = generateToken(id, 'email');
	const url = `http://localhost:5000/api/users/confirm/${emailToken}`;
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

	const mailSent = await transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log('error:');
			console.log(err);
		} else {
			console.log(info);
		}
	});

	if (mailSent) return Promise.resolve(1);
};

export default sendMail;
