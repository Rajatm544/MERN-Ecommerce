import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2'; // for paypal payments
import axios from 'axios';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
	getOrderDetails,
	payOrder,
	deliverOrder,
} from '../actions/orderActions';
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET,
} from '../constants/orderConstants';
import { savePaymentMethod } from '../actions/cartActions';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { refreshLogin } from '../actions/userActions';
import CheckoutForm from '../components/CheckoutForm'; //stripe checkout form
import getDateString from '../utils/getDateString';

const OrderPage = ({ match, history }) => {
	// load stripe
	const stripePromise = loadStripe(
		process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
	);
	// for paypal payment
	const [SDKReady, setSDKReady] = useState(false);
	const dispatch = useDispatch();
	const orderID = match.params.id;

	const orderDetails = useSelector((state) => state.orderDetails);
	const { loading, order, error } = orderDetails;

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;

	const orderDeliver = useSelector((state) => state.orderDeliver);
	const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { error: userLoginError } = userDetails;

	// get new access tokens using the refresh token, is user details throws an error
	useEffect(() => {
		if (userLoginError && userInfo && !userInfo.isSocialLogin) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(refreshLogin(user.email));
		}
	}, [userLoginError, dispatch, userInfo]);

	// set order to paid or delivered, and fetch updated orders
	useEffect(() => {
		if (!order || order._id !== orderID || successPay || successDeliver) {
			if (successPay) dispatch({ type: ORDER_PAY_RESET });
			if (successDeliver) dispatch({ type: ORDER_DELIVER_RESET });
			dispatch(getOrderDetails(orderID));
		}
	}, [order, orderID, dispatch, successPay, successDeliver]);

	// add the script required for paypal payments dynamically, to avoid possible attacks
	useEffect(() => {
		const addScript = async () => {
			const config = userInfo.isSocialLogin
				? {
						headers: {
							Authorization: `SocialLogin ${userInfo.id}`,
						},
				  }
				: {
						headers: {
							Authorization: `Bearer ${userInfo.accessToken}`,
						},
				  };
			const { data: clientID } = await axios.get(
				'/api/config/paypal',
				config
			);
			// add the script
			const script = document.createElement('script');
			script.async = true;
			script.type = 'text/javascript';
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}&currency=USD&disable-funding=credit,card`;
			script.onload = () => setSDKReady(true);
			document.body.appendChild(script);
		};
		if (!userInfo) history.push('/login'); // if not loggein in
		if (!SDKReady) addScript();
	}, [userInfo, SDKReady, history]);

	// save the payment mthod as paypal
	const successPaymentHandler = (paymentResult) => {
		dispatch(savePaymentMethod('PayPal'));
		dispatch(
			payOrder(orderID, { ...paymentResult, paymentMode: 'paypal' })
		);
	};

	// set order as delivered
	const successDeliveryHandler = () => {
		dispatch(deliverOrder(orderID));
	};

	return loading ? (
		<Loader />
	) : error ? (
		<Message dismissible variant='danger' duration={10}>
			{error}
		</Message>
	) : (
		<>
			<h2>Order {orderID}</h2>
			<Row>
				{loading ? (
					<Loader />
				) : (
					<>
						<Col md={8}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h2>Shipping</h2>
									<p>
										<strong>Name: </strong>
										{order.user.name}
									</p>
									<p>
										<strong>Email: </strong>
										<a href={`mailto:${order.user.email}`}>
											{order.user.email}
										</a>
									</p>
									<p>
										<strong>Address: </strong>{' '}
										{order.shippingAddress.address},{' '}
										{order.shippingAddress.city}-
										{order.shippingAddress.postalCode},{' '}
										{order.shippingAddress.country}
									</p>
									<div>
										{order.isDelivered ? (
											<Message variant='success'>
												Delivered at:{' '}
												{getDateString(
													order.deliveredAt
												)}
											</Message>
										) : (
											<Message variant='danger'>
												Not Delivered
											</Message>
										)}
									</div>
								</ListGroup.Item>
								<ListGroup.Item>
									<h2>Payment Method</h2>
									<p>
										<strong>Method: </strong>{' '}
										{order.paymentMethod}
									</p>
									<div>
										{order.isPaid ? (
											<Message variant='success'>
												Paid at:{' '}
												{getDateString(order.paidAt)}
											</Message>
										) : (
											<Message variant='danger'>
												Not Paid
											</Message>
										)}
									</div>
								</ListGroup.Item>
								<ListGroup.Item>
									<h2>Cart Items</h2>
									{order.orderItems.length !== 0 ? (
										<ListGroup variant='flush'>
											<div
												style={{
													background: 'red',
												}}></div>
											{order.orderItems.map(
												(item, idx) => (
													<ListGroup.Item key={idx}>
														<Row>
															<Col md={2}>
																<Image
																	className='product-image'
																	src={
																		item.image
																	}
																	alt={
																		item.name
																	}
																	fluid
																	rounded
																/>
															</Col>
															<Col>
																<Link
																	to={`/product/${item.product}`}>
																	{item.name}
																</Link>
															</Col>
															<Col md={4}>
																{item.qty} x{' '}
																{item.price} ={' '}
																{(
																	item.qty *
																	item.price
																).toLocaleString(
																	'en-IN',
																	{
																		maximumFractionDigits: 2,
																		style: 'currency',
																		currency:
																			'INR',
																	}
																)}
															</Col>
														</Row>
													</ListGroup.Item>
												)
											)}
										</ListGroup>
									) : (
										<Message>No order</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={4}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<h2 className='text-center'>
											Order Summary
										</h2>
									</ListGroup.Item>
									{error && (
										<ListGroup.Item>
											<Message
												dismissible
												variant='danger'
												duration={10}>
												{error}
											</Message>
										</ListGroup.Item>
									)}
									<ListGroup.Item>
										<Row>
											<Col>
												<strong>Subtotal</strong>
											</Col>
											<Col>
												{order.itemsPrice.toLocaleString(
													'en-IN',
													{
														maximumFractionDigits: 2,
														style: 'currency',
														currency: 'INR',
													}
												)}
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>
												<strong>Shipping</strong>
											</Col>
											<Col>
												{order.shippingPrice.toLocaleString(
													'en-IN',
													{
														maximumFractionDigits: 2,
														style: 'currency',
														currency: 'INR',
													}
												)}
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>
												<strong>Tax</strong>
											</Col>
											<Col>
												{order.taxPrice.toLocaleString(
													'en-IN',
													{
														maximumFractionDigits: 2,
														style: 'currency',
														currency: 'INR',
													}
												)}
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>
												<strong>Total</strong>
											</Col>
											<Col>
												{order.totalPrice.toLocaleString(
													'en-IN',
													{
														maximumFractionDigits: 2,
														style: 'currency',
														currency: 'INR',
													}
												)}
											</Col>
										</Row>
									</ListGroup.Item>
									{/* show paypal button or the stripe checkout form */}
									{!order.isPaid && (
										<>
											{order.paymentMethod ===
											'PayPal' ? (
												<ListGroup.Item>
													{loadingPay && <Loader />}
													{!SDKReady ? (
														<Loader />
													) : (
														<PayPalButton
															style={{
																shape: 'rect',
																color: 'gold',
																layout: 'vertical',
																label: 'pay',
															}}
															currency='USD'
															// converting INR to USD, as paypal cannot support INR
															amount={Number(
																order.totalPrice /
																	72
															).toFixed(2)}
															onSuccess={
																successPaymentHandler
															}
														/>
													)}
												</ListGroup.Item>
											) : (
												<ListGroup.Item>
													{loadingPay && <Loader />}
													<Elements
														stripe={stripePromise}>
														{/* price in paisa */}
														<CheckoutForm
															price={
																order.totalPrice *
																100
															}
															orderID={orderID}
														/>
													</Elements>
												</ListGroup.Item>
											)}
										</>
									)}
									{/* show this only to admins, after payment is done */}
									{userInfo &&
										userInfo.isAdmin &&
										order.isPaid &&
										!order.isDelivered && (
											<ListGroup.Item>
												{loadingDeliver && <Loader />}
												<div className='d-grid'>
													<Button
														type='button'
														variant='info'
														size='lg'
														onClick={
															successDeliveryHandler
														}>
														Mark as Delivered
													</Button>
												</div>
											</ListGroup.Item>
										)}
								</ListGroup>
							</Card>
						</Col>
					</>
				)}
			</Row>
		</>
	);
};

export default OrderPage;
