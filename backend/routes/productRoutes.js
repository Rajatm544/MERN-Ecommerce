import express from 'express';
import {
	deleteProduct,
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
} from '../controllers/productControllers.js';
import { protectRoute, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc fetch all the products, create a product
// @route GET /api/products
// @access PUBLIC
router
	.route('/')
	.get(getAllProducts)
	.post(protectRoute, isAdmin, createProduct);

// @desc Fetch a single product by id, Delete a product,  update a product
// @route GET /api/products/:id
// @access PUBLIC & PRIVATE/ADMIN
router
	.route('/:id')
	.get(getProductById)
	.delete(protectRoute, isAdmin, deleteProduct)
	.put(protectRoute, isAdmin, updateProduct);

export default router;
