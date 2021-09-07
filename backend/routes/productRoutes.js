import express from 'express';
import {
	deleteProduct,
	getAllProducts,
	getProductById,
} from '../controllers/productControllers.js';
import { protectRoute, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc fetch all the products
// @route GET /api/products
// @access PUBLIC
router.route('/').get(getAllProducts);

// @desc Fetch a single product by id, Delete a product
// @route GET /api/products/:id
// @access PUBLIC & PRIVATE/ADMIN
router
	.route('/:id')
	.get(getProductById)
	.delete(protectRoute, isAdmin, deleteProduct);

export default router;
