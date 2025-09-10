import mongoose, { Schema, Document } from "mongoose";

// Định nghĩa interface cho OTP (Mã xác thực một lần)
export interface IOTP extends Document {
    email: string;        // Email người dùng
    otp: string;         // Mã OTP (One-Time Password)
    expiresAt: Date;     // Thời gian hết hạn
    createdAt: Date;     // Thời gian tạo
}

// Khai báo Schema với type hỗ trợ
const OTPSchema: Schema<IOTP> = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Vui lòng nhập email'],
            lowercase: true,        // Chuyển về chữ thường
            trim: true             // Loại bỏ khoảng trắng
        },
        otp: {
            type: String,
            required: [true, 'Mã OTP không được để trống']
        },
        expiresAt: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }          // Tự động thêm createdAt và updatedAt
)

// Index để tìm kiếm OTP nhanh hơn
OTPSchema.index({ email: 1, otp: 1 });
OTPSchema.index({ expiresAt: 1 });

// TTL index để tự động xóa OTP hết hạn sau 0 giây
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Tạo model OTP
const OTP = mongoose.model<IOTP>('OTP', OTPSchema);

export default OTP;
