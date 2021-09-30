import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { payOrder } from '../actions/orderActions';
import { savePaymentMethod } from '../actions/cartActions';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ price, orderID }) => {
	const dispatch = useDispatch();
	const [clientSecret, setClientSecret] = useState('');
	const stripe = useStripe();
	const elements = useElements();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// STEP 1: create a payment intent and getting the secret
	useEffect(() => {
		const getClientSecret = async () => {
			const { data } = await axios.post(
				'/api/orders/stripe-payment',
				{ price, email: userInfo.email },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			setClientSecret(data.clientSecret);
		};

		if (userInfo && price) getClientSecret();
	}, [price, userInfo]);

	// STEP 2: make the payment after filling the form properly
	const makePayment = async (e) => {
		e.preventDefault();
		if (clientSecret) {
			const payload = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			});
			dispatch(savePaymentMethod('Stripe'));
			dispatch(
				payOrder(orderID, {
					...payload.paymentIntent,
					paymentMode: 'stripe',
				})
			);
		} else {
			window.location.reload();
		}
	};

	return (
		<Form id='payment-form' onSubmit={makePayment}>
			<Form.Group
				style={{
					margin: '1em 0',
					fontSize: '1em',
				}}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: '16px',
								color: '#424770',
								'::placeholder': {
									color: '#aab7c4',
								},
							},
							invalid: {
								color: '#9e2146',
							},
						},
					}}
					id='card-element'
				/>
			</Form.Group>
			<div className='d-grid'>
				<Button size='lg' type='submit'>
					Pay Now
				</Button>
			</div>
		</Form>
	);
};

export default CheckoutForm;