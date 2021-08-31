import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CheckoutStatus from '../components/CheckoutStatus';
import Message from '../components/Message';

const PlaceOrderPage = () => {
	const cart = useSelector((state) => state.cart);
	const { cartItems, shippingAddress, paymentMethod } = cart;

	// All prices
	cart.itemsPrice = cartItems
		.reduce((acc, item) => acc + item.price * item.qty, 0)
		.toFixed(2);
	cart.shippingPrice = (cart.itemsPrice > 100 ? 10 : 25).toFixed(2);
	cart.taxPrice = (0.15 * cart.itemsPrice).toFixed(2);
	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.taxPrice) +
		Number(cart.shippingPrice)
	).toFixed(2);

	const handleOrder = (e) => {
		e.preventDefault();
		console.log('yy');
	};
	return (
		<>
			<CheckoutStatus step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address: </strong>{' '}
								{shippingAddress.address},{' '}
								{shippingAddress.city}-
								{shippingAddress.postalCode},{' '}
								{shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong> {paymentMethod}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Cart Items</h2>
							{cartItems.length !== 0 ? (
								<ListGroup variant='flush'>
									<div style={{ background: 'red' }}></div>
									{cartItems.map((item, idx) => (
										<ListGroup.Item key={idx}>
											<Row>
												<Col md={2}>
													<Image
														src={item.image}
														alt={item.name}
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
													{item.qty} x {item.price} ={' '}
													{(
														item.qty * item.price
													).toFixed(2)}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							) : (
								<Message variant='info'>
									Your cart is empty
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
									<Col>$ {cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>$ {cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>$ {cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>$ {cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='d-grid gap-2'>
								<Button
									variant='dark'
									type='button'
									className='btn-block'
									disabled={!cartItems.length}
									onClick={handleOrder}>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderPage;
