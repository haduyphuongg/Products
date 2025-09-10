import dotenv from 'dotenv';
dotenv.config();

export const env = {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI || "",
    EMAIL_USER: process.env.EMAIL_USER || "",
    EMAIL_PASS: process.env.EMAIL_PASS || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
    OTP_EXPIRES_IN: parseInt(process.env.OTP_EXPIRES_IN || "300"),
    OTP_LENGTH: parseInt(process.env.OTP_LENGTH || "6"),
}