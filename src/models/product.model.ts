import mongoose, { Schema, Document } from "mongoose";

// Định nghĩa interface cho Product
export interface IProduct extends Document {
    name: string;
    quantity: number;
    price: number;
    image?: string; // có thể không bắt buộc
    createdBy?: string; // ID của user tạo sản phẩm
}

// Khai báo Schema với type hỗ trợ
const ProductSchema: Schema<IProduct> = new Schema(
    {
        name: { type: String, required: [true, 'Please enter product name'] },
        quantity: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, default: 0 },
        image: { type: String, required: false },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }
    },
    { timestamps: true }
)

// Tạo model
const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;