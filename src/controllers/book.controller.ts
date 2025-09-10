import { Request, Response } from "express";
import Book from "../models/book.model";

// Tạo sách mới (chỉ admin)
export const createBook = async (req: Request, res: Response) => {
    try {
        const { title, author, description, price, categories, publishedYear, isbn, stock, image } = req.body;

        // Kiểm tra ISBN đã tồn tại chưa
        const existingBook = await Book.findOne({ isbn });
        if (existingBook) {
            return res.status(400).json({
                success: false,
                message: 'ISBN đã tồn tại trong hệ thống'
            });
        }

        // Tạo sách mới
        const book = await Book.create({
            title,
            author,
            description,
            price,
            categories,
            publishedYear,
            isbn,
            stock: stock || 0,
            image,
            createdBy: req.user._id // ID của admin đang tạo sách
        });

        res.status(201).json({
            success: true,
            message: 'Tạo sách thành công',
            data: {
                book: {
                    id: book._id,
                    title: book.title,
                    author: book.author,
                    description: book.description,
                    price: book.price,
                    categories: book.categories,
                    publishedYear: book.publishedYear,
                    isbn: book.isbn,
                    stock: book.stock,
                    image: book.image,
                    createdAt: book.createdAt
                }
            }
        });

    } catch (error) {
        console.error('Create book error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};

// Lấy danh sách sách
export const getBooks = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        // Tính toán pagination
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        // Lấy tổng số sách
        const totalBooks = await Book.countDocuments();

        // Lấy danh sách sách với thông tin category
        // Lấy danh sách sách từ database
        const books = await Book.find()
            .populate('categories', 'name slug') // Populate để lấy thông tin chi tiết của categories (chỉ lấy name và slug)
            .skip(skip) // Bỏ qua số lượng records theo skip để phân trang
            .limit(limitNum) // Giới hạn số lượng records trả về theo limit
            .select('-__v'); // Loại bỏ field __v khỏi kết quả trả về

        // Tính toán thông tin pagination
        const totalPages = Math.ceil(totalBooks / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;

        res.status(200).json({
            success: true,
            message: 'Lấy danh sách sách thành công',
            data: {
                books,
                pagination: {
                    currentPage: pageNum,
                    totalPages,
                    totalBooks,
                    hasNextPage,
                    hasPrevPage,
                    limit: limitNum
                }
            }
        });

    } catch (error) {
        console.error('Get books error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};

// Lấy chi tiết sách theo ID
export const getBookById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id)
            .populate('categories', 'name slug') // Populate category name và slug
            .select('-__v');

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sách'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Lấy thông tin sách thành công',
            data: { book }
        });

    } catch (error) {
        console.error('Get book by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};
