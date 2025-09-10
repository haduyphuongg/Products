import mongoose, { Schema, Document } from "mongoose";

// Định nghĩa interface cho Category (Thể loại sách)
export interface ICategory extends Document {
    name: string;           // Tên thể loại
    slug: string;           // URL slug (tự động tạo từ name)
    createdAt: Date;        // Thời gian tạo
    updatedAt: Date;        // Thời gian cập nhật
}

// Khai báo Schema với type hỗ trợ
const CategorySchema: Schema<ICategory> = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Tên thể loại không được để trống'],
            trim: true,
            unique: true
        },
        slug: {
            type: String,
            required: [true, 'Slug không được để trống'],
            unique: true,
            trim: true,
            lowercase: true
        }
    },
    { timestamps: true }          // Tự động thêm createdAt và updatedAt
)

// // Middleware để tự động tạo slug từ name
// CategorySchema.pre('save', function(next) {
//     if (this.isModified('name')) {
//         this.slug = this.name
//             .toLowerCase()
//             .replace(/[^a-z0-9\s-]/g, '') // Loại bỏ ký tự đặc biệt
//             .replace(/\s+/g, '-')          // Thay khoảng trắng bằng dấu gạch ngang
//             .replace(/-+/g, '-')           // Loại bỏ dấu gạch ngang liên tiếp
//             .trim();
//     }
//     next();
// });

// Index để tìm kiếm nhanh hơn
CategorySchema.index({ name: 'text' });
CategorySchema.index({ slug: 1 });

// Tạo model Category
const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
