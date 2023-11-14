import UserModel from "../Models/User.js";
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
            return res.status(400).json({ message: "User is already registered" })
        }
        const user = await newUser.save();

        const token = jwt.sign({
            Email: user.Email, id: user._id
        }, process.env.JWT_KEY, { expiresIn: "1h" })

        res.status(200).json({ user, token });
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
                res.status(400).json({ message: "Wrong Password" })
            }
            else {
                const token = jwt.sign({
                    Email: user.Email, id: user._id
                }, process.env.JWT_KEY, { expiresIn: "1h" })

                res.status(200).json({ user, token })
            }
        }
        else {
            res.status(404).json({ message: "User doesn't exist" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Add Products to WishList
const addProductsToWishlist = async (req, res) => {
    const { productId, userId } = req.body;
    try {
        const User = await UserModel.findById(userId);
        //if the user has already liked that product, then it will be unliked on liking that post again
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

export { RegisterUser, LoginUser, addProductsToWishlist };