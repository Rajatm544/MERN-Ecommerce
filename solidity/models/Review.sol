// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.17;

import {Order} from "./Order.sol";

struct Review {
    address user;
    uint256 rating;
    string review;
}
