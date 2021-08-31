import express from 'express';
import { addOrderItems } from '../controllers/orderControllers.js';
import protectRoute from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc  create a new order
// @route GET /api/orders
// @access PRIVATE
router.route('/').post(protectRoute, addOrderItems);

export default router;
