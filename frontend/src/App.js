import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ConfirmPage from './pages/ConfirmPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import PasswordResetPage from './pages/PasswordResetPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-2'>
				<Container>
					<Route path='/' component={HomePage} exact />
					<Route path='/login' component={LoginPage} />
					<Route path='/register' component={RegisterPage} />
					<Route
						path='/user/password/reset/:token'
						component={PasswordResetPage}
					/>
					<Route path='/profile' component={ProfilePage} />
					<Route path='/product/:id' component={ProductPage} />
					<Route path='/cart/:id?' component={CartPage} />
					<Route
						path='/user/confirm/:token'
						component={ConfirmPage}
						exact
					/>
					<Route path='/shipping' component={ShippingPage} />
					<Route path='/payment' component={PaymentPage} />
					<Route path='/placeorder' component={PlaceOrderPage} />
					<Route path='/order/:id' component={OrderPage} />
					<Route path='/admin/userlist' component={UserListPage} />
					<Route
						path='/admin/user/:id/edit'
						component={UserEditPage}
					/>
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
