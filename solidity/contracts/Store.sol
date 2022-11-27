// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.17;

import {User} from "../models/User.sol";
import {Order} from "../models/Order.sol";
import {Product} from "../models/Product.sol";
import {Review} from "../models/Review.sol";

contract Store {
    uint256 public productCount = 0;
    uint256 orderCount = 0;

    mapping(address => User) userList;
    mapping(uint256 => Product) productList;
    mapping(uint256 => Order) orderList;

    function addUser(
        string memory _username,
        string memory _name,
        string memory _billingAdd,
        string memory _password
    ) public {
        require(
            userList[msg.sender].id != address(0),
            "Store: addUser - User already exists"
        );
        User memory user = User(
            msg.sender,
            _username,
            _name,
            _billingAdd,
            _password,
            new uint256[](0)
        );
        userList[msg.sender] = user;
    }

    function addProduct(
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256 _quantity
    ) public {
        Product memory product = Product(
            productCount,
            _name,
            _price,
            _quantity,
            _description,
            new Review[](0)
        );

        productList[productCount] = product;
        productCount++;
    }

    function addReview(
        uint256 _productId,
        uint256 _rating,
        string memory _review
    ) public {
        require(
            userList[msg.sender].id != address(0),
            "Store: addReview - User does not exist"
        );
        require(
            _productId < productCount,
            "Store: addReview - Product does not exist"
        );
        Review memory review = Review(msg.sender, _rating, _review);
        productList[_productId].reviews.push(review);
    }

    function placeOrder(
        Product[] memory _products,
        string memory _shippingDetails
    ) public {
        require(
            userList[msg.sender].id != address(0),
            "Store: placeOrder - User does not exist"
        );

        require(
            _products.length < 1,
            "Store: placeOrder - No products in order"
        );

        require(
            _products.length > productCount,
            "Store: placeOrder - Too many products"
        );

        for (uint256 i = 0; i < _products.length; i++) {
            require(
                productList[_products[i].id].id != _products[i].id,
                "Store: placeOrder - Product does not exist"
            );
            require(
                _products[i].quantity < productList[_products[i].id].quantity,
                "Store: placeOrder - Product out of stock"
            );
        }

        uint256 _amount = 0;

        for (uint256 i = 0; i < _products.length; i++) {
            _amount += _products[i].price * _products[i].quantity;
            productList[_products[i].id].quantity -= _products[i].quantity;
        }

        Order memory order = Order(
            orderCount,
            userList[msg.sender],
            _amount,
            _shippingDetails,
            _products
        );

        orderList[orderCount] = order;
        userList[msg.sender].orders.push(orderCount);

        orderCount++;
    }
}
