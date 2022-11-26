// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.17;

import {User} from '../models/User.sol';
import {Order} from '../models/Order.sol';
import {Product} from '../models/Product.sol';
import {Review} from '../models/Review.sol';

contract Store {

    uint256 productCount = 0;
    
    mapping(address => User) userList;
    mapping(uint256 => Product) productList;
    mapping(uint256 => Order) orderList;

    constructor() {
        
    }
    
}