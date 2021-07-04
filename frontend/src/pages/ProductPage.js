import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Card, Button, ListGroup } from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductPage = ({ match }) => {
	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, product, error } = productDetails;

	useEffect(() => {
		dispatch(listProductDetails(match.params.id));
	}, [match, dispatch]);

	return (
		<>
			<Link className='btn btn-outline btn-outline-dark my-2' to='/'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : product ? (
				<Row>
					<Col md={6}>
						<Image
							src={product.image}
							alt={product.name}
							fluid
							title={product.name}
						/>
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating && product.rating}
									text={`${product.numReviews} Reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Price: </strong>$ {product.price}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Description:</strong>{' '}
								{product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>
											<strong>Price: </strong>
										</Col>
										<Col>$ {product.price}</Col>
									</Row>
								</ListGroup.Item>
							</ListGroup>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>
											<strong>Status: </strong>
										</Col>
										<Col>
											{product.countInStock >= 0
												? 'In Stock'
												: 'Out of Stock'}
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Button
											type='button'
											className='btn-block btn-lg btn-dark'
											disabled={
												product.countInStock <= 0
											}>
											Add To Cart
										</Button>
									</Row>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			) : (
				''
			)}
		</>
	);
};

export default ProductPage;
