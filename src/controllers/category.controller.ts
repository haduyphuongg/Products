import { Request, Response } from "express";
import Category from "../models/category.model";

// Tạo thể loại mới (chỉ admin)
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, slug } = req.body;

        // Kiểm tra tên thể loại đã tồn tại chưa
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Tên thể loại đã tồn tại'
            });
        }

        // Tạo thể loại mới
        const category = await Category.create({
            name,
            slug
        });

        res.status(201).json({
            success: true,
            message: 'Tạo thể loại thành công',
            data: {
                category: {
                    id: category._id,
                    name: category.name,
                    slug: category.slug,
                    createdAt: category.createdAt
                }
            }
        });

    } catch (error) {
        console.error('Create category error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};

// Lấy danh sách thể loại
export const getCategories = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        // Tính toán pagination
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        // Lấy tổng số thể loại
        const totalCategories = await Category.countDocuments();

        // Lấy danh sách thể loại
        const categories = await Category.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum)
            .select('-__v');

        // Tính toán thông tin pagination
        const totalPages = Math.ceil(totalCategories / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;

        res.status(200).json({
            success: true,
            message: 'Lấy danh sách thể loại thành công',
            data: {
                categories,
                pagination: {
                    currentPage: pageNum,
                    totalPages,
                    totalCategories,
                    hasNextPage,
                    hasPrevPage,
                    limit: limitNum
                }
            }
        });

    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};

// Lấy chi tiết thể loại theo ID
export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id).select('-__v');

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy thể loại'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Lấy thông tin thể loại thành công',
            data: { category }
        });

    } catch (error) {
        console.error('Get category by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};

// Cập nhật thể loại (chỉ admin)
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Kiểm tra thể loại có tồn tại không
        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy thể loại'
            });
        }

        // Kiểm tra tên mới có trùng với thể loại khác không
        if (name && name !== existingCategory.name) {
            const duplicateCategory = await Category.findOne({ name, _id: { $ne: id } });
            if (duplicateCategory) {
                return res.status(400).json({
                    success: false,
                    message: 'Tên thể loại đã tồn tại'
                });
            }
        }

        // Cập nhật thể loại
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name },
            { new: true, runValidators: true }
        ).select('-__v');

        res.status(200).json({
            success: true,
            message: 'Cập nhật thể loại thành công',
            data: { category: updatedCategory }
        });

    } catch (error) {
        console.error('Update category error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};

// Xóa thể loại (chỉ admin)
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Kiểm tra thể loại có tồn tại không
        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy thể loại'
            });
        }

        // TODO: Kiểm tra xem có sách nào đang sử dụng thể loại này không
        // Nếu có thì không cho phép xóa

        // Xóa thể loại
        await Category.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Xóa thể loại thành công'
        });

    } catch (error) {
        console.error('Delete category error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};
