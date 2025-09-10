import nodemailer from 'nodemailer';
import { env } from '../config/env';

// Tạo transporter cho nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS
    }
});

/**
 * Gửi email chứa mã OTP
 * @param to Email người nhận
 * @param otp Mã OTP
 * @param name Tên người dùng
 */
export const sendOTPEmail = async (to: string, otp: string, name: string): Promise<void> => {
    const mailOptions = {
        from: `"OTP Verification" <${env.EMAIL_USER}>`,
        to: to,
        subject: 'Mã xác thực OTP',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333; text-align: center;">Xác thực Email</h2>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p>Xin chào <strong>${name}</strong>,</p>
                    <p>Cảm ơn bạn đã đăng ký tài khoản. Vui lòng sử dụng mã OTP dưới đây để xác thực email của bạn:</p>
                    
                    <div style="background-color: #007bff; color: white; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
                        <h1 style="margin: 0; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
                    </div>
                    
                    <p><strong>Lưu ý quan trọng:</strong></p>
                    <ul>
                        <li>Mã OTP này có hiệu lực trong ${env.OTP_EXPIRES_IN / 60} phút</li>
                        <li>Không chia sẻ mã này với bất kỳ ai</li>
                        <li>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này</li>
                        <li>Mã OTP chỉ sử dụng được một lần</li>
                    </ul>
                </div>
                
                <div style="text-align: center; color: #666; font-size: 12px;">
                    <p>Email này được gửi tự động, vui lòng không trả lời.</p>
                    <p>Nếu có thắc mắc, vui lòng liên hệ hỗ trợ.</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Đã gửi email OTP đến ${to}`);
    } catch (error) {
        console.error('Lỗi gửi email OTP:', error);
        throw new Error('Không thể gửi email OTP');
    }
};

/**
 * Gửi email thông báo xác thực thành công
 * @param to Email người nhận
 * @param name Tên người dùng
 */
export const sendVerificationSuccessEmail = async (to: string, name: string): Promise<void> => {
    const mailOptions = {
        from: `"OTP Verification" <${env.EMAIL_USER}>`,
        to: to,
        subject: 'Xác thực Email Thành Công',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #28a745; text-align: center;">🎉 Xác thực Thành Công!</h2>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p>Xin chào <strong>${name}</strong>,</p>
                    <p>🎉 Chúc mừng! Email của bạn đã được xác thực thành công.</p>
                    <p>Tài khoản của bạn hiện đã được kích hoạt và bạn có thể sử dụng tất cả các tính năng của hệ thống.</p>
                    
                    <div style="background-color: #28a745; color: white; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
                        <h3 style="margin: 0;">Tài khoản đã được xác thực!</h3>
                    </div>
                </div>
                
                <div style="text-align: center; color: #666; font-size: 12px;">
                    <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
                    <p>Nếu có thắc mắc, vui lòng liên hệ hỗ trợ.</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Đã gửi email thông báo xác thực thành công đến ${to}`);
    } catch (error) {
        console.error('Lỗi gửi email thông báo xác thực thành công:', error);
        // Không throw error vì đây chỉ là email thông báo
    }
};
