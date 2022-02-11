import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../../models/User";

export default async function handler(req, res) {
    mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.json({ response: "No token." });
        }

        const verified = jwt.verify(token, process.env.jwtSecret);

        const user = await User.findOne({ email: verified.user.email });

        return res.json({ user });
    } catch (error) {
        return res.json({ response: "No token." });
    }
}
