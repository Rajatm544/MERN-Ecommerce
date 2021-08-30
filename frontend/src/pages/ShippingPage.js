import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingPage = ({ history }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const { cartItems, shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	useEffect(() => {
		if (!(cartItems.length && userInfo)) {
			history.push('/');
		}
	}, [cartItems, history, userInfo]);

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
			<h1>Shipping Address</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='address' className='mb-2'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						size='lg'
						placeholder='Enter address'
						type='text'
						value={address}
						required
						onChange={(e) => setAddress(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='city' className='mb-2'>
					<Form.Label>City</Form.Label>
					<Form.Control
						size='lg'
						placeholder='Enter City'
						type='text'
						value={city}
						required
						onChange={(e) => setCity(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='postalCode' className='mb-2'>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						size='lg'
						placeholder='Enter Postal Code'
						type='text'
						value={postalCode}
						required
						onChange={(e) => setPostalCode(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId='country' className='mb-2'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						size='lg'
						placeholder='Enter Country'
						type='text'
						value={country}
						required
						onChange={(e) => setCountry(e.target.value)}
					/>
				</Form.Group>
				<Button type='submit' variant='dark' className='my-1'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingPage;
