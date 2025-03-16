import UserModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
import validator from 'validator';

// login user
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email })
        // console.log(exists)
        if (!user) {
            res.json({ Success: false, message: "User Doesn't  exists!" });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token, message: "Login Successful" });
        } else {
            res.json({ success: false, message: "Invalid password" });
        }
    } catch (error) {
        res.json({ success: false, token, message: "Login error" });
    }
}

// generating tokens for authentication
// sign() accepts two parameters 1. Object and 2. secret_keys
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // checking if the user already exists
        const exists = await UserModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }
        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        // console.log(token)
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { loginUser, registerUser }