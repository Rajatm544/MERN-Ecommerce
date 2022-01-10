<h1 align="center">
<img src="https://user-images.githubusercontent.com/42696800/147324216-b7c6f919-e9c4-4e3a-9411-4ffabb3a35d2.png" alt="logo" width="30" height="30" />
Kosells
<p align='center'>

<img src='https://img.shields.io/github/license/Rajatm544/MERN-Ecommerce' alt='license'>
<img src='https://img.shields.io/github/last-commit/Rajatm544/MERN-Ecommerce' alt='last commit'>
<img src='https://img.shields.io/website?down_message=Down&up_message=Up&url=https%3A%2F%2Fkosells.herokuapp.com%2F' alt='website'>
<img src='https://img.shields.io/github/v/release/Rajatm544/MERN-Ecommerce?sort=semver' alt='release'>
<img src='https://img.shields.io/maintenance/yes/2022'
<img src='https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat' alt='maintained'>
</p>
	
</h1>
An installable e-commerce app built using the MERN stack, Redux.js, Bootstrap 5 and AWS's S3 Storage. The user authentication includes 4 social login options(Google, Github, Twitter, Linkedin).
<br/>
The app also implements an email verification system for users registering using an email and password. Stripe and Paypal payment gateways are implemented to provide payment options, and the app also includes an admin panel to keep track of all products, orders and users. This is also a PWA

## Getting Started

-   Fork this repo and run the `git clone <forked repo>` command from your terminal/bash.
-   Cd into the directories and `npm install`
-   Create a `.env` file in the root directory and add the variables as in [this file](https://github.com/Rajatm544/MERN-Ecommerce/blob/main/env.md)
-   Create a `.env` file in the frontend folder and add the variables as in [this file](https://github.com/Rajatm544/MERN-Ecommerce/blob/main/frontend/env.md)
-   Run the command `npm run dev` to run the server side and the client side concurrently.

You can obtain the MONGO_URI after creating a collection on [mongodb atlas](https://www.mongodb.com/cloud/atlas).

For all the client IDs and secrets for the social login options, create a new app using your developer accounts and obtain the required credentials. This is needed to configure passport.js for using the following login options: Google, Github, Linkedin and Twitter.

For setting up nodemailer for gmail accounts, refer [this article from freecodecamp](https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/).

Obtain the paypal client ID from the paypal developer dashboard, and also obtain the Stripe payment credentials from the Stripe developer console.

_P.S: Do star this repo after you fork it :)_

## Demo

The app has been hosted on heroku [here](https://kosells.herokuapp.com/). (You might have to wait for a few seconds for the heroku site to respond)

<div align="center">

<img src="https://user-images.githubusercontent.com/42696800/140549700-13a7e968-44c3-4655-9f4e-c1e33995b2cc.png" alt="home page" width="534" height="300" />
<img src="https://user-images.githubusercontent.com/42696800/140552487-9598c06c-912b-4204-8a08-ab90328fa9d1.png" alt="login" width="534" height="300" />
<img src="https://user-images.githubusercontent.com/42696800/140549785-6fc37bec-97c8-4a78-b858-560516db146c.png" alt="product page" width="534" height="300" />
<img src="https://user-images.githubusercontent.com/42696800/140549881-d9bf8b74-003d-42a6-a0db-bc86eee6c049.png" alt="profile page" width="534" height="300" />
<img src="https://user-images.githubusercontent.com/42696800/140549950-17462265-3a02-49dc-9323-1fab76bc7b40.png" alt="admin panel" width="534" height="300" />
<img src="https://user-images.githubusercontent.com/42696800/140549912-5085954f-20bd-4b4e-8f2f-dc3a9d1a23ee.png" alt="login prompt" width="534" height="300" />
<br/>
<img alt="mobile mockup" src="https://user-images.githubusercontent.com/42696800/140550251-4e812a06-7809-4784-b1da-81cb625e5257.png" width="200" height="356"/> 
<img alt="mobile mockup 2" src="https://user-images.githubusercontent.com/42696800/140550106-0a0ce922-d2e6-469b-a8c2-4f5dc9c0ea26.png" height="356" width="200" />
<img alt="mobile mockup 3" src="https://user-images.githubusercontent.com/42696800/140553062-162670f9-570f-4c50-8a32-4cb67330d802.png" height="356" width="200"/>
<img alt="mobile mockup 4" src="https://user-images.githubusercontent.com/42696800/140553079-a4f4eeab-23d3-4a07-86bc-8decf4e63823.png" height="356" width="200" />

</div>

## Info

-   **Kosells** is an installable E-commerce PWA.
-   It has been built from scratch using the MERN stack with the client side using a redux store as well. Bootstrap 5 is used along with some custom styling.
-   [This course](https://www.udemy.com/share/103Cm43@TuAiV7GxL5Jy8NNbJb_-cpG2FeyqwS5dSG06Z6rhTh6PFAOCA05G77bxDUE-zRHj/) from Brad Traversy was the initial inspiration to build this from scratch. _But there are loads of new additional features throughout the app._
-   The client side uses React hooks along with Redux.js and redux-thunk middleware
-   The server side is built using the express framework of node.js.
-   The database used to store the users, orders, products and refresh tokens is the free tier of the cloud based mongoDB service from MongoDB Atlas.
-   The user authentication and authorisation has been implemented in two ways:

    i) **An email & password based login**:

    -   Here, the JWT tokens are used to verify each new registered user by sending an email for account verification.
    -   There is also a feature of allowing the user to reset password in case he/she forgets the credentials. This also uses refresh tokens and access tokens of varying life spans.
    -   If user changes the email id after logging in, another verification link is sent to verify the new email id for extra security.
    -   This feature has been implemented using the [nodemailer](https://nodemailer.com/about/) package, along with the json web tokens(JWT).

    ii) **Social account based login**:

    -   There are 4 options for logging in using an already exisiting social account.
    -   The Google, Github, Linkedin and Twitter account details that are required for this app include the profile email and ID, nothing else is stored or fetched from the response.
    -   The [passport.js](http://www.passportjs.org/) package is used to configure all this.
    -   In case the user tries to login with a different social account after having registered with some other type of social account, the **app also notifies** the user to login using the correct social media account.

-   The user avatar is a [gravatar](https://en.gravatar.com/) based on the stored user email.
-   The workflow for ordering the items is very simple and quick. The status tracker helps keep track of the number of steps left before placing the order.
-   The product page implements an image maginifier on hover.
-   The user can review a product only once, after the placing an order for it.
-   There is an admin panel built into the app, that can help the admin set any order as being delivered, and also allows the admin to add/update/delete any product.
-   The admin panel also provides information regarding all orders and users.
-   The app has 2 payment options available:

    i) The [Stripe API](https://stripe.com/en-in) is used to accept payments via a **Credit or Debit Card**. Since the app is still using the sandbox version, you can test this using 4242 4242 4242 4242 and any combition of date/cvv

    ii) The [Paypal](https://www.paypal.com/us/home) payment button can accept payments from any paypal account, but the app still uses sandbox credentials, so you can make payments using any sandbox client accounts.

-   The images for the user avatar and the product are stored in a private AWS S3 bucket.
-   The app is responsive and is also an installable progressive web app, with a notification sent to the user everytime the app has an update.

## A Few Features

There were a few challenges that came up during the development of the application. In this section, I aim to clarify my approach in overcoming these challeges, as a way to help you understand the code better!

### User authentication and authorization

-   As explained earlier, there are 2 approaches implemented. One makes use of **JWT**s and the other approach needs the use of a popular npm package called **passport.js**.
    -   Along with a regular email login, I wanted to implement a system for **email verification** so that the number of troll accounts is kept to a minimum.
    -   This involved sending an email with a verification link that consists of a web token/access token valid for a 15 minute duration.
    -   Once this link is clicked, the client side then makes an API call to **verify the token** and confirm the user's account.
    -   This same system is implemented to build the feature where a user can ask to reset the password.
    -   The mails are sent using [nodemailer](https://nodemailer.com/about/), and a gmail account is used to send the mails securely.
    -   The access tokens meant to validate the user session is **valid for an hour**, after which the refresh token has to be used to get new access tokens. These refresh tokens are **valid for 7 days**, after which they are removed from the Database automatically, using the **TTL concept of mongoose**.
-   The next approach includes 4 social login options provided for much quicker login experience
    -   This requires the use of various **client IDs** and **client secrets** (also called consumner ID/secret for some social login methods)
    -   To obtain this you can register a developer account and create apps for [google login](https://developers.google.com/identity/sign-in/web/sign-in), [github login](https://www.knowband.com/blog/user-manual/get-github-client-id-client-secret-api-details/), [twitter login](https://developer.twitter.com/en/docs/authentication/oauth-1-0a/obtaining-user-access-tokens) and [linkedin login](https://www.knowband.com/blog/user-manual/get-linkedin-api-key-app-secret-key-details/) options
    -   Once you have these, make sure to add all the relevant .env variables as specified in the `Getting Started` section.
    -   In order to configure the passport.js strategies, I needed to include the correct redirect URLs, which also includes the localhost with the correct PORT for the server API.
    -   Once all this is done, I configured all the passport strategies namely, the [passport-google-oauth20](http://www.passportjs.org/packages/passport-google-oauth20/), [Passport-GitHub2](http://www.passportjs.org/packages/passport-github2/), [passport-twitter](http://www.passportjs.org/packages/passport-twitter/) and [passport-linkedin-oauth2](http://www.passportjs.org/packages/passport-linkedin-oauth2/)
    -   Once the passport login is **successful**, the success-redirect sends a param in the query string to the client-side.
    -   In case the passport login **failed**, there is one more check done to see if the user is tring to login with a different social account, after registering with a different one.
    -   In this case, **a flash message is sent to the user** to indicate which is the social account he/she has registered with

### Payment Gateways

-   There are two options to make the payment for the ordered items.
-   The **Stripe API** is used to provide the option of using a Credit/Debit Card
-   The **Paypal option** accepts payments from any paypal account, and the _react-paypal-button-v2_ is used in the client side to initiate the payment process.
-   The Stripe payment makes use of creating a unique **payment intent** from the server side, for each payment and logs an invoice in the stripe developer account.
-   The currency used for the paypal option is **USD by default**, because Paypal stopped accepting payments in INR from April 2021. So there's a currency conversion that is done.
-   You can use the sandbox account for trying paypal payments and use the dummy CC number of 4242 4242 4242 4242 for trying the stripe payment gateway

### Admin Panel

-   The admin panel view is meant to handle all the orders, products and registered users
-   An order can be marked as delivered, after the user has completed the payment
-   The admin can create a product for the shop, which makes it easier to add/remove more products to replicate a real world e-commerce site
-   The users detail can altered, only by setting them as admin or not. Other than this, the admin cannot change any other detail about the registered user.
-   Helps give an estimate of the total number of orders and users on the app.

### Easy Workflow for Ordering Items

-   The app has been designed and built in a manner that makes it very easy to order items once they are added to the cart.
-   There is a status bar implemented that can help keep the user informed about the number of steps left in placing an order.

### Responsive Design & PWA

-   Bootstrap 5 is used in the form of the latest version of [react-bootstrap](https://react-bootstrap.github.io/) and a theme from [bootswatch](https://bootswatch.com/) helps in maintaining a colour palette.
-   Additional styling is included to format various smaller elements throughout the app.
-   The app has been created using [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) and has opted in for using service workers.
-   There is also a Toast component which alerts the user of a newer version of the app evrey time the app is updated.
-   The Favicons are extracted with the help of [Favicon.io](https://favicon.io/)
-   The navbar is not built using the nav elements for toggling, instead it is rendered differently based on display classes offered by bootstrap.

### Miscellaneous

-   The app makes use of [react-helmet-async](https://www.npmjs.com/package/react-helmet-async) to add a custom HTML title for different pages.
-   The app uses an **S3 storage option** to store all the gravatars or user profile pics, and the access is limited to the sdk setup in the server side.
-   A user can submit a review for any product only if he/she has placed an order for the product, and hasn't already submitted a review
-   The cart page makes it very easy to alter the quantity of the products, and the cart size is indicated to the user at all instants.
-   The product carousel in the home page fetches the top rated products and provides the details
-   Pagination is also implemented to be server side rendered list of products/orders.

## Potential Improvements

-   Adding GSAP/Framer for sleek animations!
-   Cleaner UI with use of styled components rather than just boostrap classes
-   More payment gateways like UPI or apple pay
-   Improved Fuzzy Search implementation.
-   Addition of many more product categories and a sorting feature
-   Adding products as favorites for repeated orders

Any more suggestions are always welcome in the PRs!

## Technologies Used

Some of the technologies used in the development of this web application are as follow:

-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas): It provides a free cloud service to store MongoDB collections.
-   [React.js](https://reactjs.org/): A JavaScript library for building user interfaces.
-   [Node.js](https://nodejs.org/en/): A runtime environment to help build fast server applications using JS.
-   [Express.js](https://expressjs.com/): A popular Node.js framework to build scalable server-side for web applications.
-   [Redux.js](https://redux.js.org/): A predictable & global state container for React apps.
-   [Mongoose](https://mongoosejs.com/): An ODM(Object Data Modelling)library for MongoDB and Node.js
-   [Heroku](http://heroku.com/): A platform(PaaS) to deploy full stack web applications for free.
-   [JSON Web Tokens or JWTs](https://jwt.io/): A standard to securely authenticate HTTP requests
-   [Bootstrap 5](https://getbootstrap.com/docs/4.0/getting-started/introduction/): A popular framework for building responsive, mobile-first sites.
-   [React Bootstrap](https://react-bootstrap.github.io/): The most popular front-end framework, rebuilt for React.
-   [passport.js](http://www.passportjs.org/): Simple, unobtrusive authentication for Node.js
-   [nodemailer](https://nodemailer.com/about/): Send mails using a node based server
-   [bootswatch](https://bootswatch.com/): Free & customisable themes for Bootstrap
-   [Multer](https://www.npmjs.com/package/multer) and [Multer-S3](https://www.npmjs.com/package/multer-s3): Node.js packages that help in dealing with file uploads.
-   [AWS S3 Storage Bucket](https://aws.amazon.com/s3/): An object storage service that offers industry-leading scalability, data availability, security, and performance.
