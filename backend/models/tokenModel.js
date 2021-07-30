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
		// expire_at: { type: Date, default: Date.now, expires: 1000 * 60 * 60 },
	},
	{ timestamps: true }
);

tokenSchema.index({ createdAt: 1 }, { expires: '7d' });
// console.log(tokenSchema.indexes());

const Token = mongoose.model('Token', tokenSchema);

export default Token;
