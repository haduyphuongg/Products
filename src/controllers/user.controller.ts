import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User, { UserRole } from "../models/user.model";
import OTP, { IOTP } from "../models/otp.model";
import { generateOTP, generateOTPExpiry } from "../utils/generateOtp";
import { sendOTPEmail, sendVerificationSuccessEmail } from "../utils/mailer";
import { generateToken } from "../utils/jwt";

// Đăng ký tài khoản mới
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email đã được sử dụng'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const user = await User.create({
            email,
            password: hashedPassword,
            name,
            role: req.body.role || UserRole.USER, // Cho phép chỉ định role, mặc định là USER
            isVerified: false
        });

        // Tạo và lưu OTP
        const otp = generateOTP();
        const otpExpiry = generateOTPExpiry();

        await OTP.create({
            email,
            otp,
            expiresAt: otpExpiry
        });

        // Gửi email OTP
        await sendOTPEmail(email, otp, name);

        res.status(201).json({
            success: true,
            message: 'Đăng ký thành công. Vui lòng kiểm tra email để xác thực.',
            // data: {
            //     userId: user._id,
            //     email: user.email,
            //     name: user.name,
            //     role: user.role,
            //     isVerified: user.isVerified
            // }
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};

// Gửi lại OTP
export const resendOTP = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        // Kiểm tra user có tồn tại không
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Email không tồn tại'
            });
        }

        // Xóa OTP cũ nếu có
        await OTP.deleteMany({ email });

        // Tạo OTP mới
        const otp = generateOTP();
        const otpExpiry = generateOTPExpiry();

        await OTP.create({
            email,
            otp,
            expiresAt: otpExpiry
        });

        // Gửi email OTP
        await sendOTPEmail(email, otp, user.name);

        res.status(200).json({
            success: true,
            message: 'OTP đã được gửi lại. Vui lòng kiểm tra email.'
        });

    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};

// Xác thực OTP
export const verifyOTP = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;

        // Kiểm tra user có tồn tại không
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Email không tồn tại'
            });
        }

        // Kiểm tra user đã verify chưa
        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: 'Email đã được xác thực trước đó'
            });
        }

        // Tìm OTP hợp lệ
        const otpRecord = await OTP.findOne({
            email,
            otp,
            isUsed: false,
            expiresAt: { $gt: new Date() }
        });

        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: 'OTP không hợp lệ hoặc đã hết hạn'
            });
        }

        // Xóa OTP sau khi xác thực thành công
        await OTP.findByIdAndDelete(otpRecord._id);

        // Cập nhật user thành verified
        await User.findByIdAndUpdate(user._id, { isVerified: true });

        // Gửi email thông báo thành công
        await sendVerificationSuccessEmail(email, user.name);

        // Tạo JWT token
        const token = generateToken({
            userId: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        });

        res.status(200).json({
            success: true,
            message: 'Xác thực email thành công!',
            data: {
                token,
                user: {
                    userId: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    isVerified: true
                }
            }
        });

    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};

// Đăng nhập
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Tìm user theo email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email hoặc mật khẩu không đúng'
            });
        }

        // Kiểm tra password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Email hoặc mật khẩu không đúng'
            });
        }

        // Kiểm tra email đã verify chưa
        if (!user.isVerified) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng xác thực email trước khi đăng nhập'
            });
        }

        // Tạo JWT token
        const token = generateToken({
            userId: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        });

        res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công',
            data: {
                token,
                // user: {
                //     userId: user._id,
                //     email: user.email,
                //     name: user.name,
                //     role: user.role,
                //     isVerified: user.isVerified
                // }
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};

// Lấy thông tin user hiện tại
export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        // req.user được set bởi middleware authenticateToken
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy thông tin người dùng'
            });
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Lấy thông tin người dùng thành công',
            data: {
                user: {
                    userId: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    isVerified: user.isVerified,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            }
        });

    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};


