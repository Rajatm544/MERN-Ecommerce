import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutStatus from '../components/CheckoutStatus';
import { saveShippingAddress } from '../actions/cartActions';
import { refreshLogin, getUserDetails } from '../actions/userActions';

const ShippingPage = ({ history }) => {
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems, shippingAddress } = cart;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { error } = userDetails;

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	// fetch user details from the redux store
	useEffect(() => {
		userInfo
			? userInfo.isSocialLogin
				? dispatch(getUserDetails(userInfo.id))
				: dispatch(getUserDetails('profile'))
			: dispatch(getUserDetails('profile'));
	}, [userInfo, dispatch]);

	// update access token to a new ine using the refresh tokens
	useEffect(() => {
		if (error && userInfo && !userInfo.isSocialLogin) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(refreshLogin(user.email));
		}
	}, [error, dispatch, userInfo]);

	useEffect(() => {
		if (!(cartItems.length && userInfo)) {
			history.push('/');
		}
	}, [cartItems, history, userInfo]);

	// save shipping address and move to payment screen
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			saveShippingAddress({
				address,
				city,
				postalCode,
				country,
			})
		);
		history.push('/payment');
	};

	return (
		<FormContainer>
			<CheckoutStatus step1 step2 />
			<h1>Shipping Address</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='address'>
					<FloatingLabel
						controlId='addressinput'
						label='Address'
						className='mb-3'>
						<Form.Control
							size='lg'
							placeholder='Enter address'
							type='text'
							value={address}
							required
							onChange={(e) => setAddress(e.target.value)}
						/>
					</FloatingLabel>
				</Form.Group>
				<Form.Group controlId='city'>
					<FloatingLabel
						controlId='cityinput'
						label='City'
						className='mb-3'>
						<Form.Control
							size='lg'
							placeholder='Enter City'
							type='text'
							value={city}
							required
							onChange={(e) => setCity(e.target.value)}
						/>
					</FloatingLabel>
				</Form.Group>
				<Form.Group controlId='postalCode'>
					<FloatingLabel
						controlId='postalcodeinput'
						label='Postal Code'
						className='mb-3'>
						<Form.Control
							size='lg'
							placeholder='Enter Postal Code'
							type='text'
							value={postalCode}
							required
							onChange={(e) => setPostalCode(e.target.value)}
						/>
					</FloatingLabel>
				</Form.Group>
				<Form.Group controlId='country'>
					<FloatingLabel
						controlId='countryinput'
						label='Country'
						className='mb-3'>
						<Form.Control
							size='lg'
							placeholder='Enter Country'
							type='text'
							value={country}
							required
							onChange={(e) => setCountry(e.target.value)}
						/>
					</FloatingLabel>
				</Form.Group>
				<div className='d-flex'>
					<Button
						type='submit'
						className='ms-auto'
						style={{
							padding: '0.5em 1em',
							width: '8rem',
						}}>
						Continue
					</Button>
				</div>
			</Form>
		</FormContainer>
	);
};

export default ShippingPage;
