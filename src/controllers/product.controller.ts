import { Request, Response } from "express";
import Product, { IProduct } from "../models/product.model";

// Lấy danh sách tất cả sản phẩm
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products: IProduct[] = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Lấy sản phẩm theo ID
export const getProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Thêm sản phẩm mới
export const postProduct = async (req: Request, res: Response) => {
    try {
        // Thêm thông tin user tạo sản phẩm
        const productData = {
            ...req.body,
            createdBy: req.user?._id
        };

        const product = await Product.create(productData as IProduct);
        res.status(201).json({
            success: true,
            message: 'Tạo sản phẩm thành công',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi tạo sản phẩm'
        });
    }
}

// Cập nhật sản phẩm theo ID
export const putProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cập nhật sản phẩm thành công',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi cập nhật sản phẩm'
        });
    }
}

// Xóa sản phẩm theo ID
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Xóa sản phẩm thành công'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi xóa sản phẩm'
        });
    }
}