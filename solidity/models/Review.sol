// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.17;

import {Order} from './Order.sol';
import {User} from './User.sol';

struct Review {
    Order order;
    User user;
    uint256 rating;
    string review;
}