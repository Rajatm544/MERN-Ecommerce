import mongoose from 'mongoose';

const reviewsSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		rating: { type: Number, required: true, default: 0 },
		review: { type: String, required: true },
	},
	{ timestamps: true }
);

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Types.Schema.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		reviews: [reviewsSchema],
		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		CountInStock: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model(productSchema);

export default Product;
