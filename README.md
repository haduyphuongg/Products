## Mô tả
API quản lý thư viện cho phép quản lý người dùng, sách, danh mục, mượn/trả sách và xác thực OTP qua email. Hệ thống hỗ trợ phân quyền, xác thực JWT, kiểm tra dữ liệu đầu vào và tài liệu hóa API với Swagger.

## Tính năng chính
- Đăng ký, xác thực OTP, đăng nhập người dùng
- Quản lý sách (CRUD, phân trang)
- Quản lý danh mục sách (CRUD)
- Quản lý mượn/trả sách, báo cáo sách đang mượn
- Phân quyền người dùng (admin, user)
- Xác thực JWT cho các API bảo vệ
- Gửi email OTP xác thực tài khoản
- Kiểm tra dữ liệu đầu vào với Joi
- Tài liệu hóa API với Swagger UI

## Công nghệ sử dụng
- Node.js, Express.js
- MongoDB, Mongoose
- TypeScript
- JWT, Bcrypt
- Nodemailer
- Joi, express-validator
- Swagger UI

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

## Hướng dẫn cấu hình Email để gửi OTP

### Bước 1: Bật 2-Factor Authentication
1. Truy cập [Google Account Settings](https://myaccount.google.com/)
2. Vào phần "Security"
3. Bật "2-Step Verification"

### Bước 2: Tạo App Password
1. Sau khi bật 2-Factor Authentication, vào [App Passwords](https://myaccount.google.com/apppasswords)
2. Đặt tên: "Product API"
3. Click "Create"
4. Copy mật khẩu 16 ký tự được tạo ra

2. Tạo file `.env` với cấu hình sau:
```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb+srv://mydb_user:mydb_password@cluster0.abcd123.mongodb.net/my_database?retryWrites=true&w=majority&appName=myApp


# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
JWT_EXPIRES_IN=1d

# OTP Configuration
OTP_EXPIRES_IN=300
OTP_LENGTH=6

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_character_app_password_here
```

## Chạy ứng dụng

### Development mode:
```bash
npm run dev
```

### Production mode:
```bash
npm run build
npm start
```

## Tài liệu API
- Truy cập Swagger UI tại: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)