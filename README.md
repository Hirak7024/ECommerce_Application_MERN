
# E-commerce Website

## Overview
Welcome to my fully responsive E-commerce website built using the MERN stack. This project aims to provide users with a seamless shopping experience, offering features such as user authentication, product browsing, wishlist management, and cart operations. Below is a detailed overview of the functionalities and technologies used in this project.

## Features
- **User Authentication:** Users can register and log in to access the e-commerce features.
- **Product Browsing:** Browse products by category and price range with pagination support.
- **Wishlist Management:** Users can add products to their wishlist for future reference.
- **Cart Management:** Users can add products to the cart, update product quantities, and remove products from the cart.
- **Responsive Design:** Ensures a seamless experience on all devices.
- **State Management:** Utilizes Context API for efficient state management across the application.

## Technologies Used
- **Frontend:** React js, SCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **State Management:** Context API

## Deployment
The project is deployed and can be accessed [here](https://e-commerce-application-mern.vercel.app/).

## Screenshots

### Login and Register Page
![Screenshot (232)](https://github.com/Hirak7024/ECommerce_Application_MERN/assets/118119209/0eaf5f77-829b-4045-9c03-8b4f6037c0cb)
![Screenshot (233)](https://github.com/Hirak7024/ECommerce_Application_MERN/assets/118119209/944cccc5-61fd-44e5-b74f-59b83d9d6f9e)

### Homepage
![Screenshot (234)](https://github.com/Hirak7024/ECommerce_Application_MERN/assets/118119209/d2c37486-b363-4124-93a5-6683e1be1cc2)

### Products Page
![Screenshot (235)](https://github.com/Hirak7024/ECommerce_Application_MERN/assets/118119209/fce7b8cf-9c76-418d-a701-066a4f4e3c1f)

### Product Page
![Screenshot (237)](https://github.com/Hirak7024/ECommerce_Application_MERN/assets/118119209/59478b63-61fe-425a-86f8-d549c800bebe)

### Wishlist Page
![Screenshot (236)](https://github.com/Hirak7024/ECommerce_Application_MERN/assets/118119209/7ba79b0b-8045-4e4c-8be6-e08630f3b5cc)

### Cart Component
![Screenshot (238)](https://github.com/Hirak7024/ECommerce_Application_MERN/assets/118119209/a0107f54-1d38-48b5-bc6d-83d7eaa62aa6)


## Installation
To run this project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Hirak7024/ECommerce_Application_MERN.git
   cd ECommerce_Application_MERN
   ```

2. **Set up the server:**
   ```sh
   cd server
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `server` directory and add the following variables:
   ```env
   MONGO_CONNECTION_URL = your_mongodb_connection_string
   JWT_KEY = your_jwt_secret
   PORT = port_number
   ```

4. **Start the backend:**
   ```sh
   npm start
   ```

5. **Set up the client:**
   ```sh
   cd ../client
   npm i react-scripts
   npm start
   ```
