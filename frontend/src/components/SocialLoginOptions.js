import React from 'react';
import { Card, Image } from 'react-bootstrap';
import googleLogin from '../assets/googleLogo.png';
import githubLogin from '../assets/githubLogo.png';
import twitterLogin from '../assets/twitterLogo.png';

const SocialLoginOptions = () => {
	return (
		// <Card>
		<div style={{ width: '98%', margin: '1.5em 0' }}>
			<div
				style={{
					display: 'flex',
					flexFlow: 'row nowrap',
					alignItems: 'center',
					justifyContent: 'space-evenly',
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
					display: 'flex',
					fleFlow: 'row wrap',
					alignItems: 'center',
					justifyContent: 'space-around',
				}}>
				<a href='http://localhost:5000/api/auth/google'>
					<Image
						rounded
						style={{
							width: '3em',
							height: '3em',
							objectFit: 'cover',
						}}
						src={googleLogin}></Image>
				</a>
				<a href='http://localhost:5000/api/auth/github'>
					<Image
						rounded
						style={{
							width: '3em',
							height: '3em',
							objectFit: 'cover',
						}}
						src={githubLogin}></Image>
				</a>
				<a href='http://localhost:5000/api/auth/twitter'>
					<Image
						rounded
						style={{
							width: '3em',
							height: '3em',
							objectFit: 'contain',
						}}
						src={twitterLogin}></Image>
				</a>
			</Card.Body>
		</div>

		// </Card>
	);
};

export default SocialLoginOptions;
