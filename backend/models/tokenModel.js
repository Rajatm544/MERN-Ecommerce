import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

tokenSchema.index({ createdAt: 1 }, { expires: '7d' });

const Token = mongoose.model('Token', tokenSchema);

export default Token;
