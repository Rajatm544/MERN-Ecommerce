import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutStatus from '../components/CheckoutStatus';
import { savePaymentMethod } from '../actions/cartActions';
import { refreshLogin, getUserDetails } from '../actions/userActions';

const PaymentPage = ({ history }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [paymentMethod, setPaymentMethod] = useState('PayPal');
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { error } = userDetails;

	useEffect(() => {
		userInfo
			? userInfo.isSocialLogin
				? dispatch(getUserDetails(userInfo.id))
				: dispatch(getUserDetails('profile'))
			: dispatch(getUserDetails('profile'));
	}, [userInfo, dispatch]);

	useEffect(() => {
		if (error && !userInfo.isSocialLogin) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(refreshLogin(user.email));
		}
	}, [error, dispatch, userInfo]);

	useEffect(() => {
		if (!shippingAddress) {
			history.push('/shipping');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutStatus step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>
					<Col>
						<Form.Check
							type='radio'
							label='PayPal or Credit Card'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
							checked
							onChange={(e) =>
								setPaymentMethod(e.target.value)
							}></Form.Check>
						<Form.Check
							type='radio'
							label='Stripe'
							id='Stripe'
							name='paymentMethod'
							value='Stripe'
							onChange={(e) =>
								setPaymentMethod(e.target.value)
							}></Form.Check>
					</Col>
				</Form.Group>

				<Button type='submit' variant='dark' className='my-1'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentPage;
