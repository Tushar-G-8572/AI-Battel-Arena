import { type Request, type Response } from "express";
import userModel from "../model/user.model.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/email.service.js";
import { verificationEmailTemplate } from "../utils/verifyEmail.template.js";



export async function handleRegisterController(req: Request, res: Response) {
  try {
    let { username, email, password } = req.body;

    email = email.toLowerCase();

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await userModel.create({ username, email, password });

    // Generate verification token
    const token = jwt.sign(
      { id: user._id },
      config.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Build verification URL
    const verificationUrl = `${config.CLIENT_URL}/api/auth/verify-email?token=${token}`;

    // Send verification email
    await sendEmail({
      to: user.email,
      subject: "Verify your Kinetic Arena account",
      html: verificationEmailTemplate(verificationUrl),
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please check your email to verify your account.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err: unknown) {
    console.error("Register Error:", err);

    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code: number }).code === 11000
    ) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error while registering user",
    });
  }
}

export async function handleVerifyEmailController(req: Request, res: Response) {
  try {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      return res.status(400).json({
        success: false,
        message: "Verification token is required",
      });
    }

    // Decode and verify token
    const decoded = jwt.verify(token, config.JWT_SECRET) as { id: string };

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    // Mark user as verified
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });

  } catch (err: unknown) {
    console.error("Verify Email Error:", err);

    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Verification link has expired. Please register again.",
      });
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid verification token",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error while verifying email",
    });
  }
}

export async function handleLoginController(req: Request, res: Response) {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase();

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if(!user.isVerified){
        return res.status(400).json({success:false,message:"Please Verify your email"});
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Guard against missing JWT_SECRET at runtime
    const secret = config.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined in environment");

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "2d" });

    res.cookie("token", token);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err: unknown) {
    console.error("Login Error:", err);

    return res.status(500).json({
      success: false,
      message: "Error while logging in user",
    });
  }
}

export async function handleGetMeController(req: Request, res: Response) {
  try {
    const id = req.user?.id;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await userModel.findById(id).select("username email").lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err: unknown) {
    console.error("GetMe Error:", err);

    return res.status(500).json({
      success: false,
      message: "Error while fetching user",
    });
  }
}

export async function handleLogoutController(req: Request, res: Response) {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (err: unknown) {
    console.error("Logout Error:", err);

    return res.status(500).json({
      success: false,
      message: "Error while logging out",
    });
  }
}