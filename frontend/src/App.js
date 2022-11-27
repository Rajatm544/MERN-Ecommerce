/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ConfirmPage from './pages/ConfirmPage'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrderPage from './pages/OrderPage'
import PasswordResetPage from './pages/PasswordResetPage'
import UserListPage from './pages/UserListPage'
import UserEditPage from './pages/UserEditPage'
import ProductListPage from './pages/ProductListPage'
import ProductEditPage from './pages/ProductEditPage'
import OrderListPage from './pages/OrderListPage'
import ErrorPage from './pages/ErrorPage'

// for showing the 'new update available' banner and to register the service worker
import ServiceWorkerWrapper from './ServiceWorkerWrapper'
import Web3 from 'web3'
import { useDispatch } from 'react-redux'
import { initializeBlockchain } from './actions/blockchainAction'
import { CONTRACT_ABI } from './sol-config/contractABI'
import { listProducts } from './actions/productActions'
const App = () => {
  const dispatch = useDispatch()

  const fetchProducts = async(productList,count) => {
	let arr=[];
	for(let i=0;i<count;i++)
	{
		let item= await productList(i).call()
		arr.push(item);
	}
	dispatch(listProducts(arr))
}

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3(Web3.givenProvider || process.env.WEB3_URL)
      const accounts = await web3.eth.getAccounts()
      console.log('Account loaded: ', accounts[0])
      const contract = new web3.eth.Contract(
        CONTRACT_ABI,
        process.env.DAP_ADDRESS,
      )
      dispatch(initializeBlockchain(accounts[0]))
      await fetchProducts(contract.methods.productList,contract.methods.productCount.call())
    }
  }, [])

  return (
    <Router>
      <Header />
      <ServiceWorkerWrapper />

      <main className="py-2">
        <Container>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/search/:keyword" component={HomePage} exact />
            <Route path="/page/:pageNumber" component={HomePage} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              exact
              component={HomePage}
            />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route
              path="/user/password/reset/:token"
              component={PasswordResetPage}
            />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/cart/:id?" component={CartPage} />
            <Route path="/user/confirm/:token" component={ConfirmPage} exact />
            <Route path="/shipping" component={ShippingPage} />
            <Route path="/payment" component={PaymentPage} />
            <Route path="/placeorder" component={PlaceOrderPage} />
            <Route path="/order/:id" component={OrderPage} />
            <Route path="/admin/userlist" component={UserListPage} exact />
            <Route
              path="/admin/userlist/:pageNumber"
              component={UserListPage}
              exact
            />
            <Route path="/admin/user/:id/edit" component={UserEditPage} />
            <Route
              path="/admin/productlist"
              exact
              component={ProductListPage}
            />
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductListPage}
              exact
            />
            <Route path="/admin/product/:id/edit" component={ProductEditPage} />
            <Route path="/admin/orderlist" component={OrderListPage} exact />
            <Route
              path="/admin/orderlist/:pageNumber"
              component={OrderListPage}
              exact
            />
            <Route component={ErrorPage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
