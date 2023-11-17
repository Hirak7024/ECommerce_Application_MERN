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
        }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 })

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
                }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 })
                const userResponse = {
                    _id: user._id,
                    Name: user.Name,
                    Email: user.Email,
                    WishListedProducts: user.WishListedProducts,
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

export {
    RegisterUser, LoginUser, getPayloadFromToken
};