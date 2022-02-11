import mongoose from "mongoose";
import User from "../../models/User";

export default async function handler(req, res) {
    mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.json({ response: "Email already taken." });
    }

    let newUser = new User({
        email: req.body.email,
        role: req.body.role,
    });

    await newUser.save();

    return res.json({ response: "User registered successfully." });
}
