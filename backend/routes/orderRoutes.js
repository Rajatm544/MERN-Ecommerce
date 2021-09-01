import express from 'express';
import {
	addOrderItems,
	getOrderById,
	updateOrderToPay,
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

// @desc  get an order by id
// @route GET /api/orders/:id/pay
// @access PRIVATE
router.route('/:id/pay').put(protectRoute, updateOrderToPay);

export default router;
