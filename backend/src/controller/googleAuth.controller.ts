import { type Request, type Response } from "express";
import config from "../config/config.js";
import userModel from "../model/user.model.js";
import jwt from 'jsonwebtoken';
import { getGoogleAuthUrl, getGoogleUserInfo } from '../config/googleAuth.config.js'

export async function handleGoogleAuthController(req: Request, res: Response) {
    try {
        const url = getGoogleAuthUrl();
        return res.redirect(url);
    } catch (error) {
        console.error("Google Auth error", error);
        return res.status(500).json({ success: false, message: "Failed to initiate Google authentication" })
    }
}

export async function handleGoogleCallbackController(req: Request, res: Response) {
    try {
        const { code } = req.query;
        if (!code || typeof code !== 'string') {
            return res.status(400).json({ success: false, message: "Authorization code is missing" })
        }

        const googleUser = await getGoogleUserInfo(code);

        if (!googleUser.isVerified) {
            return res.status(403).json({ success: false, message: 'Your Google account email is not verified. Please verify it on Google first.' })
        }

        let user = await userModel.findOne({ googleId: googleUser.googleId })

        if (!user) {
            const existingEmailuser = await userModel.findOne({ email: googleUser.email });
            if (existingEmailuser) {
                existingEmailuser.googleId = googleUser.googleId;
                existingEmailuser.isVerified = true
                existingEmailuser.authProvider = existingEmailuser.authProvider === 'local' ? 'both' : 'google';
                await existingEmailuser.save();
                user = existingEmailuser
            } else {
                user = await userModel.create({
                    username: googleUser.username,
                    email: googleUser.email,
                    googleId: googleUser.googleId,
                    isVerified: true,
                    authProvider: 'google'
                })
            }
        }

        const secret = config.JWT_SECRET;
        if (!secret) throw new Error("JWT_SECRET is not defined");
        const token = jwt.sign({
            id: user._id
        }, secret,
            { expiresIn: '2d' })
        res.cookie('token', token);
        return res.redirect(`http://localhost:5173`);

    } catch (error) {
        console.error("Google Callback Error:", error);
        return res.status(500).json({
            success: false,
            message: "Google authentication failed",
        });
    }
}