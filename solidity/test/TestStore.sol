// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Store.sol";

// import {OrderProduct} from "../models/Order.sol";

contract TestStore {
    Store store = Store(DeployedAddresses.Store());

    // function testAddUser() public {
    //     store.addUser("test", "test", "test", "test");
    //     Assert.equal(
    //         store.userList(msg.sender).username,
    //         "test",
    //         "User should be added"
    //     );
    // }s

    function testAddUser() public {
        string memory username = store.addUser("saad", "Saad", "test", "test");
        Assert.equal(username, "saad", "User should be added");
    }

    function testAddProduct() public {
        uint256 count = store.addProduct("name0", "descp", "imgURL", 100, 1000);
        Assert.equal(count, 3, "Product should be added");
    }

    // function testPlaceOrder() public {

    //     store.OrderProduct[] memory orderProduct;
    //     orderProduct.push(OrderProduct({productId: 0, quantity: 1}));

    //     store.placeOrder(orderProduct, "test");
    //     Assert.equal(
    //         store.orderList(0).products[0].productID,
    //         0,
    //         "Order should be placed"
    //     );
    // }
}
