import React from 'react';
import { Card, Image } from 'react-bootstrap';
import googleLogo from '../assets/googleLogo.png';
import githubLogo from '../assets/githubLogo.png';
import twitterLogo from '../assets/twitterLogo.png';
import linkedinLogo from '../assets/linkedinLogo.png';
import '../styles/social-login-option.css';

const SocialLoginOptions = () => {
	const baseURL = process.env.REACT_APP_BASE_URL;
	// display a list of 4 options and make API request to passport login on click
	return (
		<div
			id='social-login'
			style={{
				margin: '1em 0',
				padding: '0',
			}}>
			<div className='social-login-container'>
				<div className='social-login-line' />
				<p className='social-login-content'>Or Connect With</p>
				<div className='social-login-line' />
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
				<a href={`${baseURL}api/auth/google`}>
					<Image
						rounded
						style={{
							width: '2.5em',
							height: '2.5em',
							objectFit: 'cover',
						}}
						src={googleLogo}
					/>
				</a>
				<a href={`${baseURL}api/auth/github`}>
					<Image
						rounded
						style={{
							width: '2.5em',
							height: '2.5em',
							objectFit: 'cover',
						}}
						src={githubLogo}
					/>
				</a>
				<a href={`${baseURL}api/auth/twitter`}>
					<Image
						rounded
						style={{
							width: '2.5em',
							height: '2.5em',
							objectFit: 'contain',
						}}
						src={twitterLogo}
					/>
				</a>
				<a href={`${baseURL}api/auth/linkedin`}>
					<Image
						rounded
						style={{
							width: '2.5em',
							height: '2.5em',
							objectFit: 'contain',
						}}
						src={linkedinLogo}
					/>
				</a>
			</Card.Body>
		</div>
	);
};

export default SocialLoginOptions;
