import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc fetch all the products
// @route GET /api/products
// @access PUBLIC
const getAllProducts = asyncHandler(async (req, res) => {
	const page = Number(req.query.pageNumber) || 1;
	const pageSize = Number(req.query.pageSize) || 10;
	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {};
	const count = await Product.countDocuments({ ...keyword });
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch a single product by id
// @route GET /api/products/:id
// @access PUBLIC
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) res.json(product);
	else {
		// throw a custom error so that our error middleware can catch them and return apt json
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access PRIVATE/ADMIN
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		await product.remove();
		res.json({ message: 'Product removed from DB' });
	} else {
		// throw a custom error so that our error middleware can catch them and return apt json
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc Create a product
// @route POST /api/products/
// @access PRIVATE/ADMIN
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample',
		brand: 'Sample Brand',
		category: 'Sample Category',
		numReviews: 0,
		countInStock: 0,
		price: 0,
		user: req.user._id,
		image: '/images/alexa.jpg',
		description: 'Sample description',
	});
	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access PRIVATE/ADMIN
const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		brand,
		category,
		numReviews,
		countInStock,
		description,
		image,
	} = req.body;
	const product = await Product.findById(req.params.id);
	if (product) {
		if (name) product.name = name;
		if (price) product.price = price;
		if (brand) product.brand = brand;
		if (category) product.category = category;
		if (numReviews) product.numReviews = numReviews;
		if (countInStock) product.countInStock = countInStock;
		if (description) product.description = description;
		if (image) product.image = image;

		const updatedProduct = await product.save();
		if (updatedProduct) res.status(201).json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product not available');
	}
});

// @desc Create a product review
// @route POST /api/products/:id/reviews
// @access PRIVATE
const createProductReview = asyncHandler(async (req, res) => {
	const { rating, review } = req.body;
	const product = await Product.findById(req.params.id);
	if (product) {
		const reviewedAlready = product.reviews.find(
			(rev) => rev.user.toString() === req.user._id.toString()
		);
		if (reviewedAlready) {
			res.status(400);
			throw new Error('Product Already Reviewed');
		}

		const newReview = {
			name: req.user.name,
			user: req.user._id,
			rating: Number(rating),
			review,
		};

		product.reviews.push(newReview);
		product.numReviews = product.reviews.length;
		product.rating =
			product.reviews.reduce((acc, ele) => acc + ele.rating, 0) /
			product.numReviews;
		const updatedProduct = await product.save();
		if (updatedProduct) res.status(201).json({ message: 'Review Added' });
	} else {
		res.status(404);
		throw new Error('Product not available');
	}
});

// @desc fetch top rated products
// @route GET /api/products/top
// @access PUBLIC
const getTopProducts = asyncHandler(async (req, res) => {
	const topProducts = await Product.find({}).sort({ rating: -1 }).limit(4);
	res.json(topProducts);
});

export {
	getProductById,
	getAllProducts,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
};
