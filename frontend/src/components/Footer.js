import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/footer.css';

const Footer = () => {
	return (
		<Container>
			<footer className='footer-container'>
				<div className='footer-icons'>
					<a
						href='https://github.com/Rajatm544'
						aria-label='github account'
						target='_blank'
						rel='noopener noreferrer'>
						<i className='fab fa-github footer-icon' />
					</a>
					<a
						href='https://www.linkedin.com/in/rajat--m'
						aria-label='linkedin account'
						target='_blank'
						rel='noopener noreferrer'>
						<i className='fab fa-linkedin-in footer-icon' />
					</a>
					<a
						href='https://twitter.com/Rajat__m'
						aria-label='twitter account'
						target='_blank'
						rel='noopener noreferrer'>
						<i className='fab fa-twitter footer-icon' />
					</a>
					<a
						href='https://rajatm.netlify.app/'
						aria-label='developer portfolio'
						target='_blank'
						rel='noopener noreferrer'>
						<i className='fas fa-globe-asia footer-icon' />
					</a>
				</div>
				<div className='footer-copyright'>&copy;2021 Kosells</div>
			</footer>
		</Container>
	);
};

export default Footer;
