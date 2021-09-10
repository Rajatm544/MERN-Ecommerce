import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutStatus = ({ step1, step2, step3, step4 }) => {
	return (
		<Nav className='justify-content-center mb-3'>
			<div>
				{step1 ? (
					<LinkContainer to='/login'>
						<Nav.Link>Sign In</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Sign In</Nav.Link>
				)}
			</div>
			<div>
				{step2 ? (
					<LinkContainer to='/shipping'>
						<Nav.Link>Shipping</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Shipping</Nav.Link>
				)}
			</div>
			<div>
				{step3 ? (
					<LinkContainer to='/payment'>
						<Nav.Link>Payment</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Payment</Nav.Link>
				)}
			</div>
			<div>
				{step4 ? (
					<LinkContainer to='/placeorder'>
						<Nav.Link>Place Order</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Place Order</Nav.Link>
				)}
			</div>
		</Nav>
	);
};

export default CheckoutStatus;
