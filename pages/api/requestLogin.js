import mongoose from "mongoose";
import nodemailer from "nodemailer";
import User from "../../models/User";
import { google } from "googleapis";

export default async function handler(req, res) {
    mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.json({ response: "User not found." });
    }

    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const REDIRECT_URI = process.env.REDIRECT_URI;
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

    const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();

    const code = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
        from: "Travel SWA",
        to: req.body.email,
        subject: "Login code",
        html: `Login code: ${code}`,
    };

    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        auth: {
            type: "OAuth2",
            user: "dev@webabstract.io",
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
        },
    });

    await transporter.sendMail(mailOptions);

    await User.updateOne({ email: req.body.email }, { loginCode: code });

    return res.json({
        response: "Login code has been sent to your email address.",
    });
}
