import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderPage = ({ match }) => {
	const [SDKReady, setSDKReady] = useState(false);
	const dispatch = useDispatch();
	const orderID = match.params.id;
	const orderDetails = useSelector((state) => state.orderDetails);
	const { loading, order, error } = orderDetails;
	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (!order || order._id !== orderID || successPay) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch(getOrderDetails(orderID));
		}
	}, [order, orderID, dispatch, successPay]);

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
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}&currency=INR`;
			script.onload = () => setSDKReady(true);
			document.body.appendChild(script);
		};
		if (!SDKReady) addScript();
	}, [userInfo, SDKReady]);

	const successPaymentHandler = (paymentResult) => {
		console.log(paymentResult);
		dispatch(payOrder(orderID, paymentResult));
	};

	const getDateString = (date) => {
		const options = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		};
		const timeStr = new Date(date).toLocaleTimeString('en', {
			timeStyle: 'short',
			hour12: true,
			timeZone: 'IST',
		});
		return timeStr + ' ' + new Date(date).toLocaleDateString('en', options);
	};

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger' duration={10}>
			{error}
		</Message>
	) : (
		<>
			<h1>Order {orderID}</h1>
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
												{order.deliveredAt}
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
																).toFixed(2)}
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
										<h2>Order Summary</h2>
									</ListGroup.Item>
									{error && (
										<ListGroup.Item>
											<Message
												variant='danger'
												duration={10}>
												{error}
											</Message>
										</ListGroup.Item>
									)}
									<ListGroup.Item>
										<Row>
											<Col>Items</Col>
											<Col>$ {order.itemsPrice}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Shipping</Col>
											<Col>$ {order.shippingPrice}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Tax</Col>
											<Col>$ {order.taxPrice}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Total</Col>
											<Col>$ {order.totalPrice}</Col>
										</Row>
									</ListGroup.Item>
									{!order.isPaid && (
										<ListGroup.Item>
											{loadingPay && <Loader />}
											{!SDKReady ? (
												<Loader />
											) : (
												<PayPalButton
													style={{
														shape: 'rect',
														color: 'blue',
														layout: 'vertical',
														label: 'paypal',
													}}
													currency='INR'
													amount={order.totalPrice}
													onSuccess={
														successPaymentHandler
													}
												/>
											)}
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
