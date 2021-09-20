import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import axios from 'axios';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

const ProductEditPage = ({ match, history }) => {
	const productId = match.params.id;
	const [name, setName] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState('');
	const [price, setPrice] = useState(0.0);
	const [countInStock, setCountInStock] = useState(0);
	const [uploading, setUploading] = useState(false);
	const [errorImageUpload, setErrorImageUpload] = useState('');
	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, product, error } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);
	const {
		loading: loadingUpdate,
		success: successUpdate,
		error: errorUpdate,
	} = productUpdate;

	useEffect(() => {
		dispatch(listProductDetails(productId));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			history.push('/admin/productlist');
		} else {
			if (!product || product._id !== productId) {
				dispatch(listProductDetails(productId));
			} else {
				setName(product.name);
				setPrice(product.price);
				setImage(product.image);
				setBrand(product.brand);
				setCategory(product.category);
				setDescription(product.description);
				setCountInStock(product.countInStock);
			}
		}
	}, [product, dispatch, productId, history, successUpdate]);

	// useEffect(() => {
	// 	dispatch(listProductDetails(productId));
	// }, [product]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			updateProduct({
				_id: productId,
				name,
				brand,
				price,
				category,
				description,
				countInStock,
				image,
			})
		);
	};

	const handleFile = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);
		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};

			const { data } = await axios.post('/api/upload', formData, config);
			setImage(data);
			setUploading(false);
		} catch (error) {
			setErrorImageUpload('Please choose a valid image');
			setUploading(false);
		}
	};

	return (
		<>
			<Link to='/admin/productlist'>
				<Button variant='light' className='my-3'>
					Go Back
				</Button>
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{loadingUpdate ? (
					<Loader />
				) : errorUpdate ? (
					<Message variant='danger' duration={10}>
						{errorUpdate}
					</Message>
				) : (
					<>
						{loading ? (
							<Loader />
						) : (
							<Form onSubmit={handleSubmit}>
								{error && (
									<Message variant='danger' duration={10}>
										{error}
									</Message>
								)}

								<Form.Group controlId='name' className='mb-2'>
									<Form.Label>Name</Form.Label>
									<Form.Control
										size='lg'
										placeholder='Enter Name'
										type='text'
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
									/>
								</Form.Group>
								<Form.Group controlId='price' className='my-2'>
									<Form.Label>price</Form.Label>
									<Form.Control
										size='lg'
										placeholder='Enter price'
										type='number'
										value={price}
										min='0'
										max='1000'
										step='0.1'
										onChange={(e) =>
											setPrice(e.target.value)
										}
									/>
								</Form.Group>
								{errorImageUpload && (
									<Message variant='danger' duration={10}>
										{errorImageUpload}
									</Message>
								)}
								{uploading ? (
									<div>...</div>
								) : (
									<Form.Group
										controlId='image'
										className='my-2'>
										<Form.Label>Image</Form.Label>
										<Form.Control
											size='lg'
											placeholder='Enter image URL'
											type='text'
											value={image}
											onChange={(e) =>
												setImage(e.target.value)
											}
										/>
										<Form.File
											id='image-file'
											label='Choose File'
											custom
											onChange={handleFile}></Form.File>
									</Form.Group>
								)}

								<Form.Group controlId='brand' className='my-2'>
									<Form.Label>Brand</Form.Label>
									<Form.Control
										size='lg'
										placeholder='Enter brand'
										type='text'
										value={brand}
										onChange={(e) =>
											setBrand(e.target.value)
										}
									/>
								</Form.Group>
								<Form.Group
									controlId='category'
									className='my-2'>
									<Form.Label>Category</Form.Label>
									<Form.Control
										size='lg'
										placeholder='Enter category'
										type='text'
										value={category}
										onChange={(e) =>
											setCategory(e.target.value)
										}
									/>
								</Form.Group>
								<Form.Group
									controlId='description'
									className='my-2'>
									<Form.Label>Description</Form.Label>
									<Form.Control
										size='lg'
										placeholder='Enter description URL'
										type='text'
										value={description}
										onChange={(e) =>
											setDescription(e.target.value)
										}
									/>
								</Form.Group>
								<Form.Group
									controlId='countInStock'
									className='my-2'>
									<Form.Label>Count In Stock</Form.Label>
									<Form.Control
										size='lg'
										placeholder='Enter Count In Stock'
										type='number'
										min='0'
										max='1000'
										value={countInStock}
										onChange={(e) =>
											setCountInStock(e.target.value)
										}
									/>
								</Form.Group>
								<Button
									type='submit'
									// variant='dark'
									className='my-1'>
									Update Product
								</Button>
							</Form>
						)}
					</>
				)}
			</FormContainer>
		</>
	);
};

export default ProductEditPage;
