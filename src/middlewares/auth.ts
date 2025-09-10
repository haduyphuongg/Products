import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import User, { UserRole } from '../models/user.model';

// Mở rộng interface Request để thêm thông tin user
declare global {
    namespace Express {
        interface Request {
            user?: any;
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
                message: 'Chỉ quản trị viên mới có quyền truy cập'
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



/**
 * Middleware kiểm tra quyền truy cập theo role
 * @param roles Mảng các role được phép truy cập
 */
export const requireRole = (roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Vui lòng đăng nhập'
                });
            }

            // Kiểm tra user có role phù hợp không
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Bạn không có quyền truy cập'
                });
            }

            next();
        } catch (error) {
            console.error('Lỗi kiểm tra quyền role:', error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi kiểm tra quyền'
            });
        }
    };
};

/**
 * Middleware kiểm tra quyền sở hữu sản phẩm (tùy chọn)
 * Kiểm tra user có phải là người tạo sản phẩm không
 */
export const requireProductOwnership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập'
            });
        }

        const productId = req.params.id;

        // Tìm sản phẩm và kiểm tra quyền sở hữu
        // const product = await Product.findById(productId);
        // if (!product) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'Sản phẩm không tồn tại'
        //     });
        // }

        // if (product.createdBy.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({
        //         success: false,
        //         message: 'Bạn không có quyền chỉnh sửa sản phẩm này'
        //     });
        // }

        next();
    } catch (error) {
        console.error('Lỗi kiểm tra quyền sở hữu:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi kiểm tra quyền'
        });
    }
};
