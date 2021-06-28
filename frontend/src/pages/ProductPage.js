import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Card, Button, ListGroup } from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';

const ProductPage = ({ match }) => {
	const product = products.find((ele) => ele._id === match.params.id);
	return (
		<>
			<Link className='btn btn-outline btn-outline-dark my-2' to='/'>
				Go Back
			</Link>
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
								value={product.rating}
								text={`${product.numReviews} Reviews`}
							/>
						</ListGroup.Item>
						<ListGroup.Item>
							<strong>Price: </strong>$ {product.price}
						</ListGroup.Item>
						<ListGroup.Item>
							<strong>Description:</strong> {product.description}
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
							<ListGroup.Item lassName='p-0'>
								<Row>
									<Button
										type='button'
										className='btn-block btn-lg btn-dark'
										disabled={product.countInStock <= 0}>
										Add To Cart
									</Button>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default ProductPage;
