import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import passportSetup from './config/passportSetup.js';
import cookieSession from 'cookie-session';

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

// middleware to use req.body
app.use(express.json());
app.use(cors());

// use cookie sessions
app.use(
	cookieSession({
		maxAge: 1000 * 60 * 60 * 24,
		keys: [process.env.COOKIE_SESSION_KEY],
	})
);

// initialise passport middleware to use sessions
app.use(passport.initialize());
app.use(passport.session());

// setup passport
setupPassport();

// configure all the routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/config', configRoutes);
app.use('/api/upload', uploadRoutes);

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
