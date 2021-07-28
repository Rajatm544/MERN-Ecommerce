import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	expire_at: {
		type: Date,
		default: Date.now,
		expires: 60 * 60 * 24 * 7,
	},
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;
