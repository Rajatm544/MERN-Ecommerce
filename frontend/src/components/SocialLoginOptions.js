import React from 'react';
import { Card, Image } from 'react-bootstrap';
import googleLogo from '../assets/googleLogo.png';
import githubLogo from '../assets/githubLogo.png';
import twitterLogo from '../assets/twitterLogo.png';
import linkedinLogo from '../assets/linkedinLogo.png';

const SocialLoginOptions = () => {
	return (
		// <Card>
		<div
			id='social-login'
			style={{
				margin: '1em 0',
				padding: '0',
			}}>
			<div
				style={{
					display: 'flex',
					flexFlow: 'row nowrap',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginBottom: '1em',
					padding: '0',
				}}>
				<div className='social-login-line'></div>
				<p
					style={{
						padding: '0',
						margin: '0 1%',
						fontWeight: '400',
						fontSize: '0.9rem',
					}}>
					Or Connect With
				</p>
				<div className='social-login-line'></div>
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
							width: '2.5em',
							height: '2.5em',
							objectFit: 'cover',
						}}
						src={googleLogo}></Image>
				</a>
				<a href='http://localhost:5000/api/auth/github'>
					<Image
						rounded
						style={{
							width: '2.5em',
							height: '2.5em',
							objectFit: 'cover',
						}}
						src={githubLogo}></Image>
				</a>
				<a href='http://localhost:5000/api/auth/twitter'>
					<Image
						rounded
						style={{
							width: '2.5em',
							height: '2.5em',
							objectFit: 'contain',
						}}
						src={twitterLogo}></Image>
				</a>
				<a href='http://localhost:5000/api/auth/linkedin'>
					<Image
						rounded
						style={{
							width: '2.5em',
							height: '2.5em',
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
