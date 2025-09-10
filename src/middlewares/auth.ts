import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import User, { UserRole } from '../models/user.model';

// Mở rộng interface Request để thêm thông tin user
// Mở rộng interface Request của Express để thêm thuộc tính user
// Điều này cho phép chúng ta lưu thông tin user vào req.user sau khi xác thực token
// Thuộc tính user có kiểu any vì có thể chứa thông tin user từ database với nhiều trường khác nhau
declare global {
    namespace Express {
        interface Request {
            user?: any; // Thông tin user sẽ được gán vào đây sau khi xác thực token thành công
        }
    }
}

/**
 * Middleware xác thực JWT token
 * Kiểm tra token hợp lệ và lấy thông tin user
 */
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Lấy token từ header Authorization
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token không được cung cấp'
            });
        }

        // Verify token
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Token không hợp lệ hoặc đã hết hạn'
            });
        }

        // Tìm user trong database
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Người dùng không tồn tại'
            });
        }

        // Kiểm tra user đã verify email chưa
        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: 'Vui lòng xác thực email trước khi thực hiện thao tác này'
            });
        }

        // Gán thông tin user vào request
        req.user = user;
        next();

    } catch (error) {
        console.error('Lỗi xác thực token:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi xác thực'
        });
    }
};

/**
 * Middleware kiểm tra quyền admin
 * Chỉ cho phép admin truy cập
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập'
            });
        }

        // Kiểm tra role admin
        if (req.user.role !== UserRole.ADMIN) {
            return res.status(403).json({
                success: false,
                message: 'Chỉ admin mới có quyền truy cập'
            });
        }

        next();
    } catch (error) {
        console.error('Lỗi kiểm tra quyền admin:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi kiểm tra quyền'
        });
    }
};
