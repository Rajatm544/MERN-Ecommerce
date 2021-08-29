import React from 'react';
import { Card, Image } from 'react-bootstrap';
import googleLogo from '../assets/googleLogo.png';
import githubLogo from '../assets/githubLogo.png';
import twitterLogo from '../assets/twitterLogo.png';
import linkedinLogo from '../assets/linkedinLogo.png';

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
							width: '2.8em',
							height: '2.8em',
							objectFit: 'cover',
						}}
						src={googleLogo}></Image>
				</a>
				<a href='http://localhost:5000/api/auth/github'>
					<Image
						rounded
						style={{
							width: '2.8em',
							height: '2.8em',
							objectFit: 'cover',
						}}
						src={githubLogo}></Image>
				</a>
				<a href='http://localhost:5000/api/auth/twitter'>
					<Image
						rounded
						style={{
							width: '2.8em',
							height: '2.8em',
							objectFit: 'contain',
						}}
						src={twitterLogo}></Image>
				</a>
				<a href='http://localhost:5000/api/auth/linkedin'>
					<Image
						rounded
						style={{
							width: '2.8em',
							height: '2.8em',
							objectFit: 'contain',
						}}
						src={linkedinLogo}></Image>
				</a>
			</Card.Body>
		</div>

		// </Card>
	);
};

export default SocialLoginOptions;
