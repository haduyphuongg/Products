import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

// Schema validation cho tạo thể loại
const createCategorySchema = z.object({
    name: z.string().min(1, 'Tên thể loại không được để trống').max(100, 'Tên thể loại không được quá 100 ký tự')
});

// Schema validation cho cập nhật thể loại
const updateCategorySchema = z.object({
    name: z.string().min(1, 'Tên thể loại không được để trống').max(100, 'Tên thể loại không được quá 100 ký tự').optional()
});

export const validateCreateCategory = (req: Request, res: Response, next: NextFunction) => {
    try {
        createCategorySchema.parse(req.body);
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

export const validateUpdateCategory = (req: Request, res: Response, next: NextFunction) => {
    try {
        updateCategorySchema.parse(req.body);
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
