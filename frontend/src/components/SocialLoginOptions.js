import React from 'react';
import axios from 'axios';
import { Card, Image } from 'react-bootstrap';
import googleLogin from '../assets/googleLogo.png';

const SocialLoginOptions = () => {
	const handleGoogleLogin = async () => {
		const { data } = await axios.get(
			'http://localhost:5000/api/auth/google'
		);
		const { loggedInUser } = await axios.get(
			'api/users/google/redirect/success'
		);
		if (loggedInUser) {
			console.log(loggedInUser);
		}
	};

	return (
		// <Card>
		<div style={{ width: '98%', margin: '1.5em 0' }}>
			<div
				style={{
					display: 'flex',
					flexFlow: 'row nowrap',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}>
				<div
					style={{
						border: '0',
						borderTop: '1px solid #cdcdcd',
						width: '35%',
						height: '0',
					}}></div>
				<p style={{ padding: '0', margin: '0' }}>Or Connect With</p>
				<div
					style={{
						border: '0',
						borderTop: '1px solid #cdcdcd',
						width: '35%',
						height: '0',
					}}></div>
			</div>
			<Card.Body
				style={{
					margin: '0',
					padding: '0',
				}}>
				<a href='http://localhost:5000/api/auth/google'>
					<Image
						rounded
						onClick={handleGoogleLogin}
						style={{
							width: '3em',
							height: '3em',
							objectFit: 'cover',
						}}
						src={googleLogin}></Image>
				</a>
			</Card.Body>
		</div>

		// </Card>
	);
};

export default SocialLoginOptions;
