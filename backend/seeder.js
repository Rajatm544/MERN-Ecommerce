import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import Token from './models/tokenModel.js';
import connectDB from './config/db.js';

dotenv.config();
// connectDB();
mongoose
	.connect('mongodb+srv://blockchain:12345@cluster0.ramt9nl.mongodb.net/test', {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then((res) =>
		console.log(
			`MongoDB Connected: ${res.connection.host}`.cyan.underline.bold
		)
	)
	.catch((err) => {
		console.error(`Error: ${err.message}`.red.underline.bold);
		process.exit(1);
	});

const importData = async () => {
	try {
		// delete all the current data in all three collections
		await User.deleteMany();
		await Product.deleteMany();
		await Order.deleteMany();
		await Token.deleteMany();

		// create an array os users to seed into the DB
		const newUsers = await User.insertMany(users);

		// get the admin user document's id
		const adminUser = newUsers[0]._id;

		// add this admin user as the user that added all these products into the DB
		const sampleProducts = products.map((product) => ({
			...product,
			user: adminUser,
		}));

		await Product.insertMany(sampleProducts);

		console.log('Data inserted in to the DB'.green.inverse);
		process.exit();
	} catch (err) {
		console.error(`Error: ${err.message}`.red.inverse);
	}
};

const destroyData = async () => {
	try {
		// delete all the current data in all three collections
		await User.deleteMany();
		await Product.deleteMany();
		await Order.deleteMany();
		await Token.deleteMany();

		console.log('Data deleted from the DB'.red.inverse);
		process.exit();
	} catch (err) {
		console.error(`Error: ${err.message}`.red.inverse);
	}
};

importData().then(() => {
	mongoose.connection.close();
})
// check the npm flag and call appropriate function
if (process.argv[2] === '-d') destroyData();
else importData();

// module.exports = importData;