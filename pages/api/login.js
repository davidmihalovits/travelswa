import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../../models/User";

export default async function handler(req, res) {
    mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const user = await User.findOne({ email: req.body.email });

    if (!user || user.loginCode !== req.body.code) {
        return res.json({ response: "Wrong login code." });
    }

    await User.updateOne({ loginCode: req.body.code }, { loginCode: "" });

    var token = jwt.sign({ user: user }, process.env.jwtSecret, {
        expiresIn: "1d",
    });

    return res.json({ token });
}
