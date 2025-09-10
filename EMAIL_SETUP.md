# Hướng dẫn cấu hình Email để gửi OTP

## Cấu hình Gmail

### Bước 1: Bật 2-Factor Authentication
1. Truy cập [Google Account Settings](https://myaccount.google.com/)
2. Vào phần "Security"
3. Bật "2-Step Verification"

### Bước 2: Tạo App Password
1. Sau khi bật 2-Factor Authentication, vào [App Passwords](https://myaccount.google.com/apppasswords)
2. Chọn "Mail" và "Other (Custom name)"
3. Đặt tên: "Product API"
4. Click "Generate"
5. Copy mật khẩu 16 ký tự được tạo ra

### Bước 3: Cấu hình Environment Variables
Tạo file `.env` trong thư mục gốc với nội dung:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/product_api

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

### Bước 4: Test Email
Sau khi cấu hình xong, chạy server và test đăng ký:

```bash
npm run dev
```

Sau đó gọi API đăng ký:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your_email@gmail.com",
    "password": "123456"
  }'
```

## Lưu ý quan trọng

1. **Không sử dụng mật khẩu Gmail thông thường** - chỉ sử dụng App Password
2. **App Password có 16 ký tự** - không có khoảng trắng
3. **Bảo mật file .env** - không commit lên git
4. **Test với email thật** - để đảm bảo OTP được gửi thành công

## Troubleshooting

### Lỗi "Invalid login"
- Kiểm tra lại App Password
- Đảm bảo 2-Factor Authentication đã bật
- Kiểm tra email và password trong .env

### Lỗi "Authentication failed"
- Kiểm tra cấu hình Gmail
- Thử tạo App Password mới
- Kiểm tra firewall/antivirus có chặn không

### Email không nhận được
- Kiểm tra spam folder
- Đảm bảo email đúng định dạng
- Kiểm tra log server để xem lỗi
