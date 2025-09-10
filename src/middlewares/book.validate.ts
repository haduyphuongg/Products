import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

// Schema validation cho tạo sách
const createBookSchema = z.object({
    title: z.string().min(1, 'Tiêu đề sách không được để trống'),
    author: z.string().min(1, 'Tác giả không được để trống'),
    description: z.string().min(1, 'Mô tả không được để trống'),
    price: z.number().min(0, 'Giá không được âm'),
    categories: z.array(z.string()).min(1, 'Sách phải có ít nhất một thể loại'),
    publishedYear: z.number().min(1900, 'Năm xuất bản không hợp lệ').max(new Date().getFullYear() + 1, 'Năm xuất bản không hợp lệ'),
    isbn: z.string().min(1, 'ISBN không được để trống'),
    stock: z.number().min(0, 'Số lượng tồn kho không được âm').optional(),
    image: z.string().url('URL hình ảnh không hợp lệ').optional()
});

export const validateCreateBook = (req: Request, res: Response, next: NextFunction) => {
    try {
        createBookSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: (error as ZodError).issues[0].message
            });
        }
        next(error);
    }
};
