// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.17;

import {User} from "./User.sol";
import {Product} from "./Product.sol";

struct Order {
    uint256 id;
    User user;
    uint256 amount;
    string shippingDetails;
    Product[] products;
}
