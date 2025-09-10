// Auth schemas cho Swagger
export const authSchemas = {
    // Request DTOs
    RegisterDto: {
        type: 'object',
        properties: {
            name: { type: 'string', example: 'Nguyễn Văn A' },
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            password: { type: 'string', minLength: 6, example: '123456' },
            role: { type: 'string', enum: ['user', 'admin'], example: 'user' },
        },
        required: ['name', 'email', 'password'],
    },
    LoginDto: {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            password: { type: 'string', example: '123456' },
        },
        required: ['email', 'password'],
    },
    VerifyOTPDto: {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            otp: { type: 'string', example: '123456' },
        },
        required: ['email', 'otp'],
    },
    ResendOTPDto: {
        type: 'object',
        properties: {
            email: { type: 'string', format: 'email', example: 'user@example.com' },
        },
        required: ['email'],
    },

    // Response DTOs
    RegisterResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Đăng ký thành công. Vui lòng kiểm tra email để xác thực.' },
            // data: {
            //     type: 'object',
            //     properties: {
            //         userId: { type: 'string', example: '66cfc3f480d7f8c2f5a71d2b' },
            //         email: { type: 'string', example: 'user@example.com' },
            //         name: { type: 'string', example: 'Nguyễn Văn A' },
            //         role: { type: 'string', example: 'user', enum: ['user', 'admin'] },
            //         isVerified: { type: 'boolean', example: false },
            //     },
            // },
        },
    },
    LoginResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Đăng nhập thành công' },
            data: {
                type: 'object',
                properties: {
                    token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                },
            },
        },
    },
    VerifyOTPResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Xác thực email thành công!' },
        },
    },
    ResendOTPResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'OTP đã được gửi lại. Vui lòng kiểm tra email.' },
        },
    },
    CurrentUserResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Lấy thông tin người dùng thành công' },
            data: {
                type: 'object',
                properties: {
                    user: {
                        type: 'object',
                        properties: {
                            userId: { type: 'string', example: '66cfc3f480d7f8c2f5a71d2b' },
                            email: { type: 'string', example: 'user@example.com' },
                            name: { type: 'string', example: 'Nguyễn Văn A' },
                            role: { type: 'string', example: 'user', enum: ['user', 'admin'] },
                            isVerified: { type: 'boolean', example: true },
                            createdAt: { type: 'string', format: 'date-time', example: '2024-01-15T10:00:00.000Z' },
                            updatedAt: { type: 'string', format: 'date-time', example: '2024-01-15T10:30:00.000Z' },
                        },
                    },
                },
            },
        },
    },
    ErrorResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Email đã được sử dụng' },
        },
    },
};


