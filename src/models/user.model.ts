import mongoose, { Schema, Document } from "mongoose";

// Định nghĩa enum cho các role
export enum UserRole {
    USER = 'user',           // Người dùng thường
    ADMIN = 'admin'          // Quản trị viên
}

// Định nghĩa interface cho User (Người dùng)
export interface IUser extends Document {
    email: string;           // Email đăng nhập
    password: string;        // Mật khẩu đã hash
    name: string;           // Tên người dùng
    role: UserRole;         // Vai trò người dùng
    isVerified: boolean;    // Trạng thái xác thực email
    createdAt: Date;       // Thời gian tạo
    updatedAt: Date;       // Thời gian cập nhật
}

// Khai báo Schema với type hỗ trợ
const UserSchema: Schema<IUser> = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Vui lòng nhập email'],
            unique: true,           // Email phải duy nhất
            lowercase: true,        // Chuyển về chữ thường
            trim: true             // Loại bỏ khoảng trắng
        },
        password: {
            type: String,
            required: [true, 'Vui lòng nhập mật khẩu'],
            minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự']
        },
        name: {
            type: String,
            required: [true, 'Vui lòng nhập tên'],
            trim: true             // Loại bỏ khoảng trắng
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.USER,  // Mặc định là user thường
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false         // Mặc định chưa xác thực
        }
    },
    { timestamps: true }          // Tự động thêm createdAt và updatedAt
)

// Tạo model User
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
