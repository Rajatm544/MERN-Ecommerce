import express from 'express';
import {
	addOrderItems,
	getOrderById,
} from '../controllers/orderControllers.js';
import protectRoute from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc  create a new order
// @route GET /api/orders
// @access PRIVATE
router.route('/').post(protectRoute, addOrderItems);

// @desc  get an order by id
// @route GET /api/orders/:id
// @access PRIVATE
router.route('/:id').get(protectRoute, getOrderById);
export default router;
