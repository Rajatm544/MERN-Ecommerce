import React from 'react';
import products from '../products';
import Product from '../components/Product.js';
import { Row, Col } from 'react-bootstrap';

const HomePage = () => {
	return (
		<>
			<h1>Latest Products.</h1>
			<Row>
				{products.map((product) => {
					return (
						<Col sm={12} md={6} lg={4} xl={3}>
							<Product product={product} key={product._id} />
						</Col>
					);
				})}
			</Row>
		</>
	);
};

export default HomePage;
