// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.17;

import {Review} from "./Review.sol";

struct Product {
    uint256 id;
    string name;
    uint256 price;
    uint256 quantity;
    string imgUrl;
    Review[] reviews;
}
