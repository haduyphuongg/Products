// Borrow schemas cho Swagger
export const borrowSchemas = {
    // Response DTOs
    BorrowBookResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Mượn sách thành công' },
            data: {
                type: 'object',
                properties: {
                    borrowRecord: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: '66cfc3f480d7f8c2f5a71d2b' },
                            bookId: { type: 'string', example: '66cfc3f480d7f8c2f5a71d2c' },
                            borrowDate: { type: 'string', format: 'date-time', example: '2024-01-15T10:00:00.000Z' },
                            status: { type: 'string', example: 'BORROWED', enum: ['BORROWED', 'RETURNED'] },
                        },
                    },
                },
            },
        },
    },
    ReturnBookResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Trả sách thành công' },
        },
    },
    GetBorrowHistoryResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Lấy lịch sử mượn trả thành công' },
            data: {
                type: 'object',
                properties: {
                    borrowRecords: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/BorrowRecord'
                        }
                    },
                    pagination: {
                        type: 'object',
                        properties: {
                            currentPage: { type: 'number', example: 1 },
                            totalPages: { type: 'number', example: 3 },
                            totalRecords: { type: 'number', example: 25 },
                            hasNextPage: { type: 'boolean', example: true },
                            hasPrevPage: { type: 'boolean', example: false },
                            limit: { type: 'number', example: 10 },
                        },
                    },
                },
            },
        },
    },
    BorrowRecord: {
        type: 'object',
        properties: {
            _id: { type: 'string', example: '66cfc3f480d7f8c2f5a71d2b' },
            userId: { type: 'string', example: '66cfc3f480d7f8c2f5a71d2c' },
            bookId: {
                type: 'object',
                properties: {
                    _id: { type: 'string', example: '66cfc3f480d7f8c2f5a71d2d' },
                    title: { type: 'string', example: 'Đắc Nhân Tâm' },
                    author: { type: 'string', example: 'Dale Carnegie' },
                    category: { type: 'string', example: 'Kỹ năng sống' },
                    image: { type: 'string', example: 'https://example.com/dac-nhan-tam.jpg' },
                },
            },
            borrowDate: { type: 'string', format: 'date-time', example: '2024-01-15T10:00:00.000Z' },
            returnDate: { type: 'string', format: 'date-time', example: '2024-01-22T10:00:00.000Z' },
            status: { type: 'string', example: 'RETURNED', enum: ['BORROWED', 'RETURNED'] },
            createdAt: { type: 'string', format: 'date-time', example: '2024-01-15T10:00:00.000Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2024-01-22T10:00:00.000Z' },
        },
    },
};
