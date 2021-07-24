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
	expireAt: {
		type: Date,
		default: Date.now,
		index: { expires: 60 * 60 * 24 },
	},
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;
