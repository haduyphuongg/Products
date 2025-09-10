# Product API with Authentication & Swagger Documentation

API quản lý sản phẩm với hệ thống xác thực OTP qua email và tài liệu Swagger tự động.

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Tạo file `.env` với cấu hình sau:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/product_api
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=1d
OTP_EXPIRES_IN=300
OTP_LENGTH=6
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

3. Đảm bảo MongoDB đang chạy trên máy local hoặc cập nhật `MONGODB_URI` với connection string của bạn.

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

## API Endpoints

### Swagger Documentation
- **URL**: `http://localhost:5000/api-docs`
- **Mô tả**: Tài liệu API đầy đủ với giao diện Swagger UI

### Health Check
- **GET** `http://localhost:5000/`
- **Mô tả**: Kiểm tra trạng thái API

### Authentication API
- **POST** `http://localhost:5000/api/auth/register` - Đăng ký tài khoản mới
- **POST** `http://localhost:5000/api/auth/login` - Đăng nhập
- **POST** `http://localhost:5000/api/auth/verify-otp` - Xác thực OTP
- **POST** `http://localhost:5000/api/auth/resend-otp` - Gửi lại OTP

### Products API
- **GET** `http://localhost:5000/api/products` - Lấy danh sách sản phẩm
- **GET** `http://localhost:5000/api/products/:id` - Lấy chi tiết sản phẩm
- **POST** `http://localhost:5000/api/products` - Tạo sản phẩm mới
- **PUT** `http://localhost:5000/api/products/:id` - Cập nhật sản phẩm
- **DELETE** `http://localhost:5000/api/products/:id` - Xóa sản phẩm

## Cấu trúc dự án

```
src/
├── config/
│   └── env.ts                 # Cấu hình environment variables
├── controllers/
│   ├── product.controller.ts  # Logic xử lý product
│   └── user.controller.ts     # Logic xử lý authentication
├── models/
│   ├── product.model.ts       # Schema Product
│   ├── user.model.ts          # Schema User
│   └── otp.model.ts           # Schema OTP
├── routers/
│   ├── product.router.ts      # Routes cho products
│   └── user.router.ts         # Routes cho authentication
├── utils/
│   ├── generateOtp.ts         # Utility tạo OTP
│   ├── mailer.ts              # Utility gửi email
│   └── jwt.ts                 # Utility JWT
├── swagger/
│   └── swagger.ts             # Cấu hình Swagger
└── server.ts                  # Entry point
```

## Tính năng

- ✅ RESTful API với Express.js
- ✅ TypeScript support
- ✅ MongoDB với Mongoose
- ✅ Swagger documentation tự động
- ✅ CORS support
- ✅ Error handling
- ✅ JSDoc comments cho API documentation
- ✅ Authentication với JWT
- ✅ Email verification với OTP
- ✅ Password hashing với bcrypt
- ✅ Email sending với nodemailer

## Ví dụ sử dụng

### Đăng ký tài khoản:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "password": "123456"
  }'
```

### Xác thực OTP:
```bash
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "otp": "123456"
  }'
```

### Đăng nhập:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "123456"
  }'
```

### Tạo sản phẩm mới:
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15",
    "quantity": 10,
    "price": 19990000,
    "image": "https://example.com/iphone15.jpg"
  }'
```

### Lấy danh sách sản phẩm:
```bash
curl http://localhost:5000/api/products
```

## Troubleshooting

1. **Swagger không hiển thị**: Đảm bảo server đã khởi động và truy cập đúng URL `/api-docs`
2. **Lỗi MongoDB**: Kiểm tra connection string và đảm bảo MongoDB đang chạy
3. **Lỗi CORS**: API đã được cấu hình CORS để cho phép cross-origin requests
