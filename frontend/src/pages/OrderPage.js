import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderActions';

const OrderPage = ({ match }) => {
	const dispatch = useDispatch();
	const orderID = match.params.id;
	const orderDetails = useSelector((state) => state.orderDetails);
	const { loading, order, error } = orderDetails;

	useEffect(() => {
		if (!order || order._id !== orderID) {
			dispatch(getOrderDetails(orderID));
		}
	}, [order, orderID, dispatch]);

	// useEffect(() => {
	// 	dispatch(getOrderDetails(orderID));
	// }, [orderID]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
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
												Paid at: {order.paidAt}
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
										<Message variant='info'>
											No order
										</Message>
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
									{error && (
										<ListGroup.Item>
											<Message variant='danger'>
												{error}
											</Message>
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
