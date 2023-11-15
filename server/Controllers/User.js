import UserModel from "../Models/User.js";
import ProductModel from "../Models/ProductModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const RegisterUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.Password, salt);

    req.body.Password = hashedPass;
    const newUser = new UserModel(req.body);
    const { Email } = req.body;
    try {
        const oldUser = await UserModel.findOne({ Email })
        if (oldUser) {
            return res.status(400).json({ message: "User is already registered", status_code: 400 })
        }
        const user = await newUser.save();

        const token = jwt.sign({
            Name: user.Name, Email: user.Email, id: user._id
        }, process.env.JWT_KEY, { expiresIn: 60*60*24 })

        const userResponse = {
            _id: user._id,
            Name: user.Name,
            Email: user.Email,
            WishListedProducts: user.WishListedProducts,
        }

        res.status(200).json({ data: { userResponse, token }, message: "User Registered Successfully", status_code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const LoginUser = async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const user = await UserModel.findOne({ Email: Email });

        if (user) {
            const validity = await bcrypt.compare(Password, user.Password);

            if (!validity) {
                res.status(400).json({ message: "Incorrect Password", status_code: 400 })
            }
            else {
                const token = jwt.sign({
                    Name: user.Name, Email: user.Email, _id: user._id
                }, process.env.JWT_KEY, { expiresIn: 60*60*24 })
                const userResponse = {
                    _id: user._id,
                    Name: user.Name,
                    Email: user.Email,
                    // WishListedProducts: user.WishListedProducts,
                }

                res.status(200).json({ data: { userResponse, token }, message: "Login Successful", status_code: 200 })
            }
        }
        else {
            res.status(404).json({ message: "User doesn't exist", status_code: 404 })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get Decoded token
const getPayloadFromToken = (req, res) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
  
    const tokenParts = token.split(" ");
  
    if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
      return res.status(401).json({ message: 'Unauthorized - Invalid token format' });
    }
  
    const jwtToken = tokenParts[1];
  
    try {
      const decodedPayload = jwt.verify(jwtToken, process.env.JWT_KEY);
      res.json({ payload: decodedPayload });
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
  };
  

//Add Products to WishList
const addProductsToWishlist = async (req, res) => {
    const { productId, userId } = req.body;
    try {
        const User = await UserModel.findById(userId);
        if (User.WishListedProducts.includes(productId)) {
            await User.updateOne({ $pull: { WishListedProducts: productId } });
            res.status(200).json({ message: "Product Removed from Wishlist" });
        } else {
            await User.updateOne({ $push: { WishListedProducts: productId } });
            res.status(200).json({ message: "Product Added To Wishlist" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

//Get WishListedProducts 
const getWishlistedProducts = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find the user by ID
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract the wishlisted product IDs
        const wishlistedProductIds = user.WishListedProducts;

        // Find the details of wishlisted products
        const wishlistedProducts = await ProductModel.find({ _id: { $in: wishlistedProductIds } });

        res.status(200).json({ wishlistedProducts });
    } catch (error) {
        console.error('Error fetching wishlisted product details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//Add Products To Cart
const addProductsToCart = async (req, res) => {
    const { productId, userId } = req.body;
    try {
        const User = await UserModel.findById(userId);
        await User.updateOne({ $push: { CartProducts: productId } });
        res.status(200).json({ message: "Product Added To Cart" });
    } catch (error) {
        res.status(500).json(error);
    }
};

//Remove Product from Cart
const removeProductsFromCart = async (req, res) => {
    const { productId, userId } = req.body;
    try {
        const User = await UserModel.findById(userId);
        await User.updateOne({ $pull: { CartProducts: productId } });
        res.status(200).json({ message: "Product Removed from Cart" });
    } catch (error) {
        res.status(500).json(error);
    }
};

//Get Cart Products
const getCartProducts = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartProductIds = user.CartProducts;

        const cartProducts = await ProductModel.find({ _id: { $in: cartProductIds } });

        res.status(200).json({ cartProducts });
    } catch (error) {
        console.error('Error fetching cart product details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
export {
    RegisterUser,
    LoginUser,
    addProductsToWishlist,
    getWishlistedProducts,
    addProductsToCart,
    removeProductsFromCart,
    getCartProducts,
    getPayloadFromToken
};