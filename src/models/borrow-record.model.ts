import mongoose, { Schema, Document } from "mongoose";

// Định nghĩa enum cho trạng thái mượn sách
export enum BorrowStatus {
    BORROWED = 'BORROWED',    // Đang mượn
    RETURNED = 'RETURNED'     // Đã trả
}

// Định nghĩa interface cho BorrowRecord (Lịch sử mượn trả)
export interface IBorrowRecord extends Document {
    userId: string;           // ID người dùng
    bookId: string;           // ID sách
    borrowDate: Date;         // Ngày mượn
    returnDate: Date | null;  // Ngày trả (null nếu chưa trả)
    status: BorrowStatus;     // Trạng thái mượn/trả
    createdAt: Date;          // Thời gian tạo record
    updatedAt: Date;          // Thời gian cập nhật
}

// Khai báo Schema với type hỗ trợ
const BorrowRecordSchema: Schema<IBorrowRecord> = new Schema(
    {
        userId: {
            type: String,
            required: [true, 'ID người dùng không được để trống'],
            trim: true
        },
        bookId: {
            type: String,
            required: [true, 'ID sách không được để trống'],
            trim: true
        },
        borrowDate: {
            type: Date,
            required: [true, 'Ngày mượn không được để trống'],
            default: Date.now
        },
        returnDate: {
            type: Date,
            default: null
        },
        status: {
            type: String,
            enum: Object.values(BorrowStatus),
            default: BorrowStatus.BORROWED,
            required: true
        }
    },
    { timestamps: true }          // Tự động thêm createdAt và updatedAt
)

// Index để tìm kiếm nhanh hơn
BorrowRecordSchema.index({ userId: 1, bookId: 1 });
BorrowRecordSchema.index({ userId: 1, status: 1 });
BorrowRecordSchema.index({ bookId: 1, status: 1 });
BorrowRecordSchema.index({ borrowDate: -1 });

// Tạo model BorrowRecord
const BorrowRecord = mongoose.model<IBorrowRecord>('BorrowRecord', BorrowRecordSchema);

export default BorrowRecord;
