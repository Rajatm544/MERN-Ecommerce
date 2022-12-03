// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.17;

pragma experimental ABIEncoderV2;

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

    struct Review {
        address user;
        uint256 rating;
        string review;
    }

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
    mapping(uint256 => mapping(uint256 => Review)) reviewList;

    uint256 productCount = 0;

    event UserAdded(address, string);
    event ProductAdded(uint256, string);
    event ReviewAdded(uint256, string, uint256);
    event OrderPlaced(address, uint256, uint256);
    event ProductReturned(uint256, string);
    event ProductsReturned(Product[]);
    event OrdersReturned(Order[]);
    event ReviewsReturned(Review[]);

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
            "data:image",
            14999,
            20
        );
    }

    function addUser(
        string memory _username,
        string memory _name,
        string memory _billingAdd,
        string memory _password
    ) public {
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
    }

    function getUser() public view returns (User memory) {
        return userList[msg.sender];
    }

    function addProduct(
        string memory _name,
        string memory _description,
        string memory _imgUrl,
        uint256 _price,
        uint256 _quantity
    ) public {
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
    }

    function getProduct(uint256 prodID) public returns (Product memory) {
        emit ProductReturned(prodID, productList[prodID].name);
        return productList[prodID];
    }

    function getProductList() public returns (Product[] memory) {
        Product[] memory _products = new Product[](productCount);

        for (uint256 i = 0; i < productCount; i++) {
            _products[i] = productList[i];
        }

        emit ProductsReturned(_products);
        return _products;
    }

    function addReview(
        uint256 _productId,
        uint256 _rating,
        string memory _review
    ) public {
        // require(
        //     userList[msg.sender].id == address(0),
        //     "Store: addReview - User does not exist"
        // );

        // require(
        //     _rating < 0 || _rating > 5,
        //     "Store: addReview - Rating should be between 0 and 5"
        // );

        // require(
        //     _productId < 0 || _productId > productCount,
        //     "Store: addReview - Product does not exist"
        // );

        // require(
        //     productList[_productId].id != _productId,
        //     "Store: addReview - Product does not exist"
        // );

        reviewList[_productId][productList[_productId].reviewCount] = Review(
            msg.sender,
            _rating,
            _review
        );

        productList[_productId].reviewCount++;

        emit ReviewAdded(
            productList[_productId].reviewCount - 1,
            _review,
            _rating
        );
    }

    function getReviews(uint256 _productId) public returns (Review[] memory) {
        Review[] memory reviews = new Review[](
            productList[_productId].reviewCount
        );

        for (uint256 i = 0; i < productList[_productId].reviewCount; i++) {
            reviews[i] = reviewList[_productId][i];
        }

        emit ReviewsReturned(reviews);
        return reviews;
    }

    function addOrder(
        OrderProduct[] memory _products,
        string memory _shippingDet
    ) public {
        // require(
        //     userList[msg.sender].id == address(0),
        //     "Store: addOrder - User does not exist"
        // );

        uint256 total = 0;
        // for (uint256 i = 0; i < _products.length; i++) {
        //     require(
        //         _products[i].id < 0 || _products[i].id > productCount,
        //         "Store: addOrder - Product does not exist"
        //     );

        //     require(
        //         productList[_products[i].id].id != _products[i].id,
        //         "Store: addOrder - Product does not exist"
        //     );

        //     require(
        //         productList[_products[i].quantity].quantity == 0,
        //         "Store: addOrder - Product out of stock"
        //     );
        // }

        for (uint256 i = 0; i < _products.length; i++) {
            productList[_products[i].id].quantity -= _products[i].quantity;
            total += productList[_products[i].id].price;

            orderProductList[msg.sender][userList[msg.sender].orderCount][
                i
            ] = Product(
                _products[i].id,
                productList[_products[i].id].name,
                productList[_products[i].id].price,
                _products[i].quantity,
                productList[_products[i].id].description,
                productList[_products[i].id].imgUrl,
                productList[_products[i].id].reviewCount
            );
        }

        orderList[msg.sender][userList[msg.sender].orderCount] = Order(
            userList[msg.sender].orderCount,
            total,
            _shippingDet,
            _products.length
        );

        userList[msg.sender].orderCount++;

        emit OrderPlaced(
            msg.sender,
            userList[msg.sender].orderCount - 1,
            total
        );
    }

    function getOrders() public returns (Order[] memory) {
        Order[] memory _orders = new Order[](userList[msg.sender].orderCount);

        for (uint256 i = 0; i < userList[msg.sender].orderCount; i++) {
            _orders[i] = orderList[msg.sender][i];
        }

        emit OrdersReturned(_orders);
        return _orders;
    }
}
