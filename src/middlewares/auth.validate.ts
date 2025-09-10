import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

// Schema validation cho đăng ký
const registerSchema = z.object({
    name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    role: z.enum(['user', 'admin']).optional() // Cho phép chỉ định role, không bắt buộc
});

// Schema validation cho đăng nhập
const loginSchema = z.object({
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(1, 'Mật khẩu không được để trống')
});

// Schema validation cho verify OTP
const verifyOTPSchema = z.object({
    email: z.string().email('Email không hợp lệ'),
    otp: z.string().length(6, 'OTP phải có 6 chữ số')
});

// Schema validation cho resend OTP
const resendOTPSchema = z.object({
    email: z.string().email('Email không hợp lệ')
});

// Middleware validation
export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    try {
        registerSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: (error as ZodError).issues[0].message
            });
        }
        next(error);
    }
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    try {
        loginSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: (error as ZodError).issues[0].message
            });
        }
        next(error);
    }
};

export const validateVerifyOTP = (req: Request, res: Response, next: NextFunction) => {
    try {
        verifyOTPSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: (error as ZodError).issues[0].message
            });
        }
        next(error);
    }
};

export const validateResendOTP = (req: Request, res: Response, next: NextFunction) => {
    try {
        resendOTPSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: (error as ZodError).issues[0].message
            });
        }
        next(error);
    }
};


