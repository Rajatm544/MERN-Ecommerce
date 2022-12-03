/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
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
import $ from 'jquery'
import { blockchainLoader } from './sol-config/config'

const App = () => {
  const dispatch = useDispatch()
  const [refreshData, setRefreshData] = useState(true)
  const [productList, setProductList] = useState([])

  // useEffect(() => {
  //   if (!refreshData) return
  //   setRefreshData(false)
  //   blockchainLoader().then((e) => {
  //     console.log('Account: ', e.addressAccount)
  //     console.log('Contract: ', e.contract)
  //     console.log('Products: ', e.productList)
  //   })
  // }, [])

  // const fetchProducts = async (contract) => {
  //   console.log('Product count: ')
  //   let count = await contract.methods.productCount().call()
  //   console.log('🚀 ~ file: App.js ~ line 40 ~ fetchProducts ~ count', count)
  //   let arr = []
  //   for (let i = 1; i <= count; i++) {
  //     let item = await contract.methods.productList(i).call()
  //     arr.push(item)
  //   }
  //   console.log('prods Arr', arr)
  //   dispatch(listProducts(arr))
  // }

  // const addProduct = async (contract, id) => {
  //   let prod = {
  //     name: 'TEST',
  //     imgUrl: '/imgUrls/airpods.jpg',
  //     description:
  //       'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
  //     price: 14999,
  //     quantity: 20,
  //   }
  //   console.log('adding prod: ', prod)
  //   let ret = await contract.methods
  //     .addProduct(prod)
  //     .send({ from: id })
  //     .once('receipt', (receipt) => {
  //       console.log('recipet:', receipt)
  //     })

  //   console.log('ret val0', ret)
  // }

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        App.web3Provider = window.ethereum
        try {
          // Request account access
          await window.ethereum.enable()
        } catch (error) {
          // User denied account access...
          console.error('User denied account access')
        }
      }
      const web3 = new Web3(App.web3Provider)
      await blockchainLoader(web3).then((e) => {
        console.log('Account: ', e.addressAccount)
        console.log('Contract: ', e.contract)
        console.log('Products: ', e.productList)

        dispatch(
          initializeBlockchain({
            account: e.addressAccount,
            contract: e.contract,
            // balance: accounts[0].getBalance()
          }),
        )
        setProductList(e.productList)
        dispatch(listProducts(e.productList))
      })
      // App.initContract()

      //   const web3 = new Web3(Web3.givenProvider || process.env.WEB3_URL)
      // const accounts = await web3.eth.getAccounts()
      // console.log('Account loaded: ', accounts[0])
      // const contract = new web3.eth.Contract(
      //   CONTRACT_ABI,
      //   process.env.DAP_ADDRESS,
      // )
      // console.log('contract: ', contract)
      // dispatch(
      //   initializeBlockchain({
      //     account: accounts[0],
      //     contract: contract,
      //     // balance: accounts[0].getBalance()
      //   }),
      // )
    }
    loadBlockchainData()
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
