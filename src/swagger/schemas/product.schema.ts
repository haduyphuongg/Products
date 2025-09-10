// Product schemas cho Swagger
export const productSchemas = {
    Product: {
        type: 'object',
        properties: {
            _id: { type: 'string', example: '66cfc3f480d7f8c2f5a71d2b' },
            name: { type: 'string', example: 'iPhone 15' },
            quantity: { type: 'number', example: 10 },
            price: { type: 'number', example: 19990000 },
            image: { type: 'string', nullable: true, example: 'https://...' },
            createdBy: { type: 'string', example: '66cfc3f480d7f8c2f5a71d2c' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
        },
        required: ['name', 'quantity', 'price'],
    },
    ProductCreateDto: {
        type: 'object',
        properties: {
            name: { type: 'string', example: 'iPhone 15' },
            quantity: { type: 'number', example: 10 },
            price: { type: 'number', example: 19990000 },
            image: { type: 'string', nullable: true, example: 'https://...' },
        },
        required: ['name', 'quantity', 'price'],
    },
    ProductUpdateDto: {
        type: 'object',
        properties: {
            name: { type: 'string', example: 'iPhone 15 Pro' },
            quantity: { type: 'number', example: 12 },
            price: { type: 'number', example: 23990000 },
            image: { type: 'string', nullable: true, example: 'https://...' },
        },
    },
    ProductResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Tạo sản phẩm thành công' },
            data: { $ref: '#/components/schemas/Product' },
        },
    },
    DeleteResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Xóa sản phẩm thành công' },
        },
    },
};
