import express from 'express';
import { getPaypalClientId } from '../controllers/configControllers.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc fetch PAYPAL client id credential
// @route GET /api/config/paypal
// @access PRIVATE
router.route('/paypal').get(protectRoute, getPaypalClientId);

export default router;
