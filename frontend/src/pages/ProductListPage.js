import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts, deleteProduct } from '../actions/productActions';

const ProductListPage = ({ history, match }) => {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, products, error } = productList;

	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDelete,
		success: successDelete,
		error: errorDelete,
	} = productDelete;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) dispatch(listProducts());
		else history.push('/login');
	}, [dispatch, history, userInfo, successDelete]);

	const handleDelete = (id) => {
		if (window.confirm('Are you sure you wanna delete user?'))
			dispatch(deleteProduct(id));
		// dispatch(deleteUser(id));
	};
	const handleCreateProduct = (product) => {
		console.log(product);
	};
	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button
						className='my-3'
						onClick={handleCreateProduct}
						variant='dark'>
						<i className='fas fa-plus'></i> Create Product
					</Button>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table
					striped
					bordered
					responsive
					className='table-sm text-center'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th>ACTION</th>
						</tr>
					</thead>
					<tbody>
						{products &&
							products.map((product) => {
								return (
									<tr key={product._id}>
										<td>{product._id}</td>
										<td>{product.name}</td>
										<td>${product.price}</td>
										<td>{product.category}</td>
										<td>{product.brand}</td>

										<td
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-around',
											}}>
											<LinkContainer
												to={`/admin/product/${product._id}/edit`}>
												<Button
													variant='link'
													className='btn-sm'>
													<i className='fas fa-edit'></i>
												</Button>
											</LinkContainer>
											<Button
												className='btn-sm'
												onClick={() =>
													handleDelete(product._id)
												}
												variant='danger'>
												<i className='fas fa-trash'></i>
											</Button>
										</td>
									</tr>
								);
							})}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default ProductListPage;
