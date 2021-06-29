import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/Product.js';
import { Row, Col } from 'react-bootstrap';

const HomePage = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get('/api/products')
			.then((res) => setProducts([...res.data]))
			.catch((err) => console.error('Error', err));
	}, []);

	return (
		<>
			<h1>Latest Products.</h1>
			<Row>
				{products.map((product) => {
					return (
						<Col sm={12} md={6} lg={4} xl={3} key={product._id}>
							<Product product={product} />
						</Col>
					);
				})}
			</Row>
		</>
	);
};

export default HomePage;
