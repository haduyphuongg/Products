import { Request, Response } from "express";
import Book from "../models/book.model";
import BorrowRecord, { BorrowStatus } from "../models/borrow-record.model";

// Mượn sách
export const borrowBook = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const userId = req.user._id;

        // Kiểm tra sách có tồn tại không
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sách'
            });
        }

        // Kiểm tra sách còn trong kho không
        if (book.stock <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Sách đã hết trong kho'
            });
        }

        // Kiểm tra user đã mượn sách này chưa trả chưa
        const existingBorrow = await BorrowRecord.findOne({
            userId,
            bookId,
            status: BorrowStatus.BORROWED
        });

        if (existingBorrow) {
            return res.status(400).json({
                success: false,
                message: 'Bạn đã mượn sách này và chưa trả'
            });
        }

        // Tạo record mượn sách
        const borrowRecord = await BorrowRecord.create({
            userId,
            bookId,
            borrowDate: new Date(),
            status: BorrowStatus.BORROWED
        });

        // Giảm số lượng sách trong kho
        await Book.findByIdAndUpdate(bookId, {
            $inc: { stock: -1 }
        });

        res.status(201).json({
            success: true,
            message: 'Mượn sách thành công',
            data: {
                borrowRecord: {
                    id: borrowRecord._id,
                    bookId: borrowRecord.bookId,
                    borrowDate: borrowRecord.borrowDate,
                    status: borrowRecord.status
                }
            }
        });

    } catch (error) {
        console.error('Borrow book error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};

// Trả sách
export const returnBook = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const userId = req.user._id;

        // Kiểm tra sách có tồn tại không
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sách'
            });
        }

        // Tìm record mượn sách
        const borrowRecord = await BorrowRecord.findOne({
            userId,
            bookId,
            status: BorrowStatus.BORROWED
        });

        if (!borrowRecord) {
            return res.status(400).json({
                success: false,
                message: 'Bạn chưa mượn sách này hoặc đã trả rồi'
            });
        }

        // Cập nhật record trả sách
        await BorrowRecord.findByIdAndUpdate(borrowRecord._id, {
            returnDate: new Date(),
            status: BorrowStatus.RETURNED
        });

        // Tăng số lượng sách trong kho
        await Book.findByIdAndUpdate(bookId, {
            $inc: { stock: 1 }
        });

        res.status(200).json({
            success: true,
            message: 'Trả sách thành công'
        });

    } catch (error) {
        console.error('Return book error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};

// Lấy lịch sử mượn trả của bản thân
export const getBorrowHistory = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        const { page = 1, limit = 10 } = req.query;

        // Xây dựng filter
        const filter: any = { userId };

        // Tính toán pagination
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        // Lấy tổng số records
        const totalRecords = await BorrowRecord.countDocuments(filter);

        // Lấy danh sách records với thông tin sách
        const borrowRecords = await BorrowRecord.find(filter)
            .sort({ borrowDate: -1 })
            .skip(skip)
            .limit(limitNum)
            .populate('bookId', 'title author category image')
            .select('-__v');

        // Tính toán thông tin pagination
        const totalPages = Math.ceil(totalRecords / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;

        res.status(200).json({
            success: true,
            message: 'Lấy lịch sử mượn trả thành công',
            data: {
                borrowRecords,
                pagination: {
                    currentPage: pageNum,
                    totalPages,
                    totalRecords,
                    hasNextPage,
                    hasPrevPage,
                    limit: limitNum
                }
            }
        });

    } catch (error) {
        console.error('Get borrow history error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};
