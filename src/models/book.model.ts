import mongoose, { Schema, Document, Types } from "mongoose";

// Định nghĩa interface cho Book (Sách)
export interface IBook extends Document {
    title: string;           // Tiêu đề sách
    author: string;          // Tác giả
    description: string;     // Mô tả
    price: number;           // Giá
    categories: Types.ObjectId[];    // Array ObjectId các thể loại
    publishedYear: number;   // Năm xuất bản
    isbn: string;            // Mã ISBN
    stock: number;           // Số lượng tồn kho
    image: string;           // URL hình ảnh
    createdBy: string;       // ID người tạo (admin)
    createdAt: Date;         // Thời gian tạo
    updatedAt: Date;         // Thời gian cập nhật
}

// Khai báo Schema với type hỗ trợ
const BookSchema: Schema<IBook> = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Tiêu đề sách không được để trống'],
            trim: true
        },
        author: {
            type: String,
            required: [true, 'Tác giả không được để trống'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Mô tả không được để trống'],
            trim: true
        },
        price: {
            type: Number,
            required: [true, 'Giá không được để trống'],
            min: [0, 'Giá không được âm']
        },
        categories: {
            type: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
            required: [true, 'Thể loại không được để trống'],
            validate: {
                validator: function(categories: Types.ObjectId[]) {
                    return categories && categories.length > 0;
                },
                message: 'Sách phải có ít nhất một thể loại'
            }
        },
        publishedYear: {
            type: Number,
            required: [true, 'Năm xuất bản không được để trống'],
            min: [1900, 'Năm xuất bản không hợp lệ'],
            max: [new Date().getFullYear() + 1, 'Năm xuất bản không hợp lệ']
        },
        isbn: {
            type: String,
            required: [true, 'ISBN không được để trống'],
            unique: true,
            trim: true
        },
        stock: {
            type: Number,
            required: [true, 'Số lượng tồn kho không được để trống'],
            min: [0, 'Số lượng tồn kho không được âm'],
            default: 0
        },
        image: {
            type: String,
            trim: true
        },
        createdBy: {
            type: String,
            required: [true, 'ID người tạo không được để trống']
        }
    },
    { timestamps: true }          // Tự động thêm createdAt và updatedAt
)

// Index để tìm kiếm sách nhanh hơn
BookSchema.index({ title: 'text', author: 'text', description: 'text' });
BookSchema.index({ categories: 1 });
BookSchema.index({ isbn: 1 });

// Tạo model Book
const Book = mongoose.model<IBook>('Book', BookSchema);

export default Book;
