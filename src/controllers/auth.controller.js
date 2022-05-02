const signature = process.env.JWT_SECRET;
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('cookie-parser')

exports.signup = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!(email && password)) {
            return res.status(400).send("all input requered");
        }
        const oldUser = await User.findOne({email});
        if (oldUser) {
            return res.status(409).send("user already exists.please Login");
        }
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({email, password: encryptedPassword})
        return res.status(200).send(user);

    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}
exports.signin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (! user) {
            return res.status(400).send("user not exists");
        }
        const passwordcompare = await bcrypt.compare(password, user.password);
        if (! passwordcompare) {
            return res.status(400).send({status: "error", error: error.message});
        }
        const data = {
            id: user._id,
            email: user.email,
            products:user.products
        };
        const userToken = jwt.sign({
            data
        }, signature);
        user.userToken = userToken;
        await user.save();
        delete user.password
        return res.status(200).send({
            message: "OK",
            data: {
                email: user.email,
                userToken: user.userToken,
                id: user._id,
                products:user.products
            }
        });
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
};