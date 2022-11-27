// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.17;

contract Store {
    struct User {
        address id;
        string username;
        string name;
        string billingAdd;
        string password;
        uint256[] orderList;
    }

    struct Review {
        address user;
        uint256 rating;
        string review;
    }

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        uint256 quantity;
        string description;
        string imgUrl;
        uint256[] reviewIDs;
    }

    struct OrderProduct {
        uint256 productID;
        uint256 quantity;
    }

    struct Order {
        uint256 id;
        User user;
        uint256 amount;
        string shippingDetails;
        uint256 productCount;
        mapping(uint256 => OrderProduct) products;
    }

    uint256 public productCount = 0;
    uint256 orderCount = 0;
    uint256 reviewCount = 0;

    mapping(address => User) userList;
    mapping(uint256 => Product) public productList;
    mapping(uint256 => Order) orderList;
    mapping(uint256 => Review) reviewList;

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
            new uint256[](0) // oderList
        );

        userList[msg.sender] = user;
    }

    constructor() public {
        addProduct(
            "Airpods Wireless Bluetooth Headphones",
            "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
            "/imgUrls/airpods.jpg",
            14999,
            20
        );
        addProduct(
            "1 Airpods Wireless Bluetooth Headphones",
            "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
            "/imgUrls/airpods.jpg",
            14999,
            20
        );
        addProduct(
            "2 Airpods Wireless Bluetooth Headphones",
            "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
            "/imgUrls/airpods.jpg",
            14999,
            20
        );
    }

    event ProductAdded(string name, uint256 id);

    function getProduct(uint256 _id) public view returns (Product memory) {
        return productList[_id];
    }

    function addProduct(
        string memory _name,
        string memory _description,
        string memory _imgUrl,
        uint256 _price,
        uint256 _quantity
    ) public returns (uint256) {
        Product memory product = Product(
            productCount,
            _name,
            _price,
            _quantity,
            _description,
            _imgUrl,
            new uint256[](0)
        );

        productList[productCount] = product;
        productCount++;
        emit ProductAdded(_name, productCount);
        return productList[productCount - 1].id;
    }

    // function addReview(
    //     uint256 _productId,
    //     uint256 _rating,
    //     string memory _review
    // ) public {
    //     require(
    //         userList[msg.sender].id != address(0),
    //         "Store: addReview - User does not exist"
    //     );
    //     require(
    //         _productId < productCount || _productId > productCount,
    //         "Store: addReview - Product does not exist"
    //     );
    //     Review memory review = Review(msg.sender, _rating, _review);
    //     productList[_productId].reviews.push(review);
    // }

    // function placeOrder(
    //     OrderProduct[] memory _products,
    //     string memory _shippingDetails
    // ) public {
    //     require(
    //         userList[msg.sender].id != address(0),
    //         "Store: placeOrder - User does not exist"
    //     );

    //     require(
    //         _products.length < 1,
    //         "Store: placeOrder - No products in order"
    //     );

    //     require(
    //         _products.length > productCount,
    //         "Store: placeOrder - Too many products"
    //     );

    //     for (uint256 i = 0; i < _products.length; i++) {
    //         require(
    //             productList[_products[i].productID].id !=
    //                 _products[i].productID,
    //             "Store: placeOrder - Product does not exist"
    //         );
    //         require(
    //             _products[i].quantity <
    //                 productList[_products[i].productID].quantity,
    //             "Store: placeOrder - Product out of stock"
    //         );
    //     }

    //     uint256 _amount = 0;

    //     for (uint256 i = 0; i < _products.length; i++) {
    //         _amount +=
    //             productList[_products[i].productID].price *
    //             _products[i].quantity;
    //         productList[_products[i].productID].quantity -= _products[i]
    //             .quantity;
    //     }

    //     Order memory order = Order(
    //         orderCount,
    //         userList[msg.sender],
    //         _amount,
    //         _shippingDetails,
    //         _products
    //     );

    //     orderList[orderCount] = order;
    //     userList[msg.sender].orderList.push(orderCount);

    //     orderCount++;
    // }
}
