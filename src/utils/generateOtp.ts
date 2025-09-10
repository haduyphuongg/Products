import { env } from '../config/env';

/**
 * Tạo mã OTP ngẫu nhiên
 * @param length Độ dài mã OTP (mặc định từ env.OTP_LENGTH)
 * @returns Mã OTP dạng string
 */
export const generateOTP = (length?: number): string => {
    const otpLength = length || env.OTP_LENGTH;
    const digits = '0123456789';
    let otp = '';

    for (let i = 0; i < otpLength; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }

    return otp;
};

/**
 * Tạo thời gian hết hạn cho OTP
 * @param minutes Số phút OTP có hiệu lực (mặc định từ env.OTP_EXPIRES_IN)
 * @returns Date object
 */
export const generateOTPExpiry = (minutes?: number): Date => {
    const expiryMinutes = minutes || (env.OTP_EXPIRES_IN / 60); // Chuyển từ giây sang phút
    return new Date(Date.now() + expiryMinutes * 60 * 1000);
};
