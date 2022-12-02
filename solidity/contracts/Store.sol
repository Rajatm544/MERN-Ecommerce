// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.17;

// pragma experimental ABIEncoderV2;

contract Store {
    struct User {
        address id;
        string username;
        string name;
        string billingAdd;
        string password;
        uint256 orderCount;
    }

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        uint256 quantity;
        string description;
        string imgUrl;
        uint256 reviewCount;
    }

    // struct Review {
    //     address user;
    //     uint256 rating;
    //     string review;
    // }

    struct Order {
        uint256 id;
        uint256 amount;
        string shippingDetails;
        uint256 orderProductCount;
    }

    struct OrderProduct {
        uint256 id;
        uint256 quantity;
    }

    // Mappings for handling user functionalities
    mapping(address => User) userList;
    mapping(address => mapping(uint256 => Order)) orderList;
    mapping(address => mapping(uint256 => mapping(uint256 => Product))) orderProductList;

    // Mappings for handling product functionalities
    mapping(uint256 => Product) productList;
    // mapping(uint256 => mapping(uint256 => Review)) reviewList;

    uint256 productCount = 0;

    event UserAdded(address, string);
    event ProductAdded(uint256, string);
    event ReviewAdded(uint256, string, uint256);
    event OrderPlaced(address, uint256, uint256);

    constructor() public {
        addProduct(
            "Airpods Wireless Bluetooth Headphones",
            "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
            "https://rebeltech.com/wp-content/uploads/2021/10/MME73.jpg",
            14999,
            20
        );
        addProduct(
            "iPhone 11 Pro 256GB Memory",
            "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
            "https://images.priceoye.pk/apple-iphone-xi-pakistan-priceoye-oik1o-500x500.webp",
            14999,
            20
        );
        addProduct(
            "Cannon EOS 80D DSLR Camera",
            "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
            "data:image/jpeg;base64,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",
            14999,
            20
        );
    }

    function addUser(
        string memory _username,
        string memory _name,
        string memory _billingAdd,
        string memory _password
    ) public returns (string memory) {
        // require(
        //     userList[msg.sender].id == msg.sender,
        //     "Store: addUser - User already exists"
        // );

        userList[msg.sender] = User(
            msg.sender,
            _username,
            _name,
            _billingAdd,
            _password,
            0
        );

        emit UserAdded(msg.sender, _username);
        return userList[msg.sender].username;
    }

    // function getUser(string memory _username, string memory _password)
    //     public
    //     view
    //     returns (bool)
    // {
    //     // require(StringUtils  userList[msg.sender].username == _username);
    // }

    // function getUserOrder(address _id) public view returns (Order[] memory) {
    //     Order[] memory orders = new Order[](userList[_id].orderCount);

    //     for (uint256 i = 0; i < userList[_id].orderCount; i++) {
    //         orders[i] = orderList[_id][i];
    //     }

    //     return orders;
    // }

    // function getUserOrderProducts(address _id, uint256 _orderId)
    //     public
    //     view
    //     returns (Product[] memory)
    // {
    //     Product[] memory products = new Product[](
    //         orderList[_id][_orderId].orderProductCount
    //     );
    //     for (
    //         uint256 i = 0;
    //         i < orderList[_id][_orderId].orderProductCount;
    //         i++
    //     ) {
    //         products[i] = orderProductList[_id][_orderId][i];
    //     }

    //     return products;
    // }

    function addProduct(
        string memory _name,
        string memory _description,
        string memory _imgUrl,
        uint256 _price,
        uint256 _quantity
    ) public returns (uint256) {
        productList[productCount] = Product(
            productCount,
            _name,
            _price,
            _quantity,
            _description,
            _imgUrl,
            0
        );

        productCount++;
        emit ProductAdded(productCount, _name);
        return productCount - 1;
    }

    // function getProducts() public view returns (Product[] memory) {
    //     Product[] memory products = new Product[](productCount);

    //     for (uint256 i = 0; i < productCount; i++) {
    //         products[i] = productList[i];
    //     }

    //     return products;
    // }

    // function getProduct(uint256 _id) public view returns (Product memory) {
    //     return productList[_id];
    // }

    // function addReview(
    //     uint256 _productId,
    //     uint256 _rating,
    //     string memory _review
    // ) public {
    //     require(
    //         userList[msg.sender].id == address(0),
    //         "Store: addReview - User does not exist"
    //     );

    //     require(
    //         _rating < 0 || _rating > 5,
    //         "Store: addReview - Rating should be between 0 and 5"
    //     );

    //     require(
    //         _productId < 0 || _productId > productCount,
    //         "Store: addReview - Product does not exist"
    //     );

    //     require(
    //         productList[_productId].id != _productId,
    //         "Store: addReview - Product does not exist"
    //     );

    //     reviewList[_productId][productList[_productId].reviewCount] = Review(
    //         msg.sender,
    //         _rating,
    //         _review
    //     );

    //     productList[_productId].reviewCount++;

    //     emit ReviewAdded(
    //         productList[_productId].reviewCount - 1,
    //         _review,
    //         _rating
    //     );
    // }

    // function getReviews(uint256 _productId)
    //     public
    //     view
    //     returns (Review[] memory)
    // {
    //     Review[] memory reviews = new Review[](
    //         productList[_productId].reviewCount
    //     );

    //     for (uint256 i = 0; i < productList[_productId].reviewCount; i++) {
    //         reviews[i] = reviewList[_productId][i];
    //     }

    //     return reviews;
    // }

    // function getReview(uint256 _productId, uint256 _reviewId)
    //     public
    //     view
    //     returns (Review memory)
    // {
    //     return reviewList[_productId][_reviewId];
    // }

    // function addOrder(
    //     OrderProduct[] memory _products,
    //     string memory _shippingDet
    // ) public {
    //     // require(
    //     //     userList[msg.sender].id == address(0),
    //     //     "Store: addOrder - User does not exist"
    //     // );

    //     uint256 total = 0;
    //     for (uint256 i = 0; i < _products.length; i++) {
    //         require(
    //             _products[i].id < 0 || _products[i].id > productCount,
    //             "Store: addOrder - Product does not exist"
    //         );

    //         require(
    //             productList[_products[i].id].id != _products[i].id,
    //             "Store: addOrder - Product does not exist"
    //         );

    //         require(
    //             productList[_products[i].quantity].quantity == 0,
    //             "Store: addOrder - Product out of stock"
    //         );
    //     }

    //     for (uint256 i = 0; i < _products.length; i++) {
    //         productList[_products[i].id].quantity -= _products[i].quantity;
    //         total += productList[_products[i].id].price;

    //         orderProductList[msg.sender][userList[msg.sender].orderCount][
    //             i
    //         ] = Product(
    //             _products[i].id,
    //             productList[_products[i].id].name,
    //             productList[_products[i].id].price,
    //             _products[i].quantity,
    //             productList[_products[i].id].description,
    //             productList[_products[i].id].imgUrl,
    //             productList[_products[i].id].reviewCount
    //         );
    //     }

    //     orderList[msg.sender][userList[msg.sender].orderCount] = Order(
    //         userList[msg.sender].orderCount,
    //         total,
    //         _shippingDet,
    //         _products.length
    //     );

    //     userList[msg.sender].orderCount++;

    //     emit OrderPlaced(
    //         msg.sender,
    //         userList[msg.sender].orderCount - 1,
    //         total
    //     );
    // }
}
