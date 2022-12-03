/* eslint-disable no-undef */
import StoreJSON from '../Store.json'
var truffleContract = require('@truffle/contract')

export const blockchainLoader = async (web3) => {
  //   await web3Loader()
  const addressAccount = await loadAccount(web3)
  const { contract, productList } = await loadContract(web3, addressAccount)

  return { addressAccount, contract, productList }
}

const refineData = (data) => {
  // uint256 id;
  //     string name;
  //     uint256 price;
  //     uint256 quantity;
  //     string description;
  //     string imgUrl;
  //     uint256[] reviewIDs;
  let arr = []
  for (let i = 0; i < data.length; i++) {
    data[i].id = data[i]?.id?.toNumber()
    // data[i].name = data[i]?.name
    data[i].price = data[i]?.price?.toNumber()
    data[i].quantity = data[i]?.quantity?.toNumber()
    data[i].imgUrl="https://rebeltech.com/wp-content/uploads/2021/10/MME73.jpg"
    // data[i].description = data[i]?.description
    let obj = {
      id: data[i].id,
      price: data[i].price,
      quantity: data[i].quantity,
      description: data[i].description,
      name: data[i].name,
      imgUrl: data[i].imgUrl
    }
    arr.push(obj)
    arr.push(obj)
  }
  return arr
}
export const loadProducts = async (contract) => {
  const productCount = await contract.productCount()
  let arr = []
  for (let i = 1; i <= productCount; i++) {
    let item = await contract.productList(i)
    arr.push(item)
  }
//   console.log('prods Arr', arr)
  let filteredData = refineData(arr)

  return filteredData

  // dispatch(listProducts(arr))
}

export const loadContract = async (web3, addressAccount) => {
  const storeContract = truffleContract(StoreJSON)
  storeContract.setProvider(web3.eth.currentProvider)
  const contract = await storeContract.deployed()
  const productList = await loadProducts(contract)
  //   const productCount = await contract.productCount(addressAccount)

  return { contract, productList }
}

export const loadAccount = async (web3) => {
  const account = await web3?.eth?.getCoinbase()
//   console.log('account:', account)
  return account
}

// const web3Loader = async () => {
//   window.addEventListener('load', async () => {
//     // Modern dapp browsers...
//     if (window.ethereum) {
//       App.web3Provider = window.ethereum
//       try {
//         // Request account access
//         await window.ethereum.enable()
//       } catch (error) {
//         // User denied account access...
//         console.error('User denied account access')
//       }
//     }
//   })
// }
