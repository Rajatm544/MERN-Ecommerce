import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors'; // color the statements in the server side console log
import morgan from 'morgan'; // show the API endpoints
import compression from 'compression'; // use gzip compression in the express server
import cors from 'cors'; // allow cross origin requests
import passport from 'passport'; // for all social login options
import cookieSession from 'cookie-session'; // for implementing cookie sessions for passport
import flash from 'connect-flash'; // so that passport flash messages can work
import path from 'path';

// middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import configRoutes from './routes/configRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import setupPassport from './config/passportSetup.js';

dotenv.config();
const app = express();

// use morgan in development mode
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// connect to the mongoDB database
connectDB();

app.use(express.json()); // middleware to use req.body
app.use(cors()); // to avoid CORS errors
app.use(compression()); // to use gzip

// use cookie sessions
app.use(
	cookieSession({
		maxAge: 1000 * 60 * 60 * 24, // 1 day
		keys: [process.env.COOKIE_SESSION_KEY],
	})
);

// initialise passport middleware to use sessions, and flash messages
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// setup passport
setupPassport();

// configure all the routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/config', configRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();

// To prepare for deployment
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')));

	app.use('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	);
}

// middleware to act as fallback for all 404 errors
app.use(notFound);

// configure a custome error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
			.bold
	)
);
