import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Types.Schema.ObjectId,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				user: {
					type: mongoose.Types.Schema.ObjectId,
					required: true,
					ref: 'User',
				},
				quantity: { type: Number, required: true, default: 0 },
				price: { type: Number, required: true, default: 0 },
				image: { type: String, required: true },
				product: {
					type: mongoose.Types.Schema.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		shippingAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			pinCode: { type: String, required: true },
			country: { type: String, required: true },
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String },
		},
		taxPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		shippingPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		deliveredAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model(orderSchema);

export default Order;
