import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
	return (
		<Card className='my-3 p-0'>
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} variant='top' />
			</Link>

			<Card.Body>
				<Link
					to={`/product/${product._id}`}
					style={{ color: 'dimgray', textDecoration: 'none' }}>
					<Card.Title as='p' style={{ minHeight: '7ch' }}>
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as='div'>
					{product && product.rating && (
						<Rating
							value={product.rating}
							text={`${product.numReviews} Review${
								product.numReviews > 1 ? 's' : ''
							}`}
						/>
					)}
				</Card.Text>

				<Card.Text as='h4'>
					{product.price &&
						product.price.toLocaleString('en-IN', {
							maximumFractionDigits: 2,
							style: 'currency',
							currency: 'INR',
						})}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
