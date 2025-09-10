// Book schemas cho Swagger
export const bookSchemas = {
    // Request DTOs
    CreateBookDto: {
        type: 'object',
        properties: {
            title: { type: 'string', example: 'Đắc Nhân Tâm' },
            author: { type: 'string', example: 'Dale Carnegie' },
            description: { type: 'string', example: 'Cuốn sách về nghệ thuật đối nhân xử thế' },
            price: { type: 'number', example: 150000 },
            categories: { 
                type: 'array', 
                items: { type: 'string' },
                example: ['66cfc3f480d7f8c2f5a71d2b', '66cfc3f480d7f8c2f5a71d2c'],
                description: 'Array ID các thể loại'
            },
            publishedYear: { type: 'number', example: 2020 },
            isbn: { type: 'string', example: '978-604-1-12345-6' },
            stock: { type: 'number', example: 50 },
            image: { type: 'string', example: 'https://example.com/dac-nhan-tam.jpg' },
        },
        required: ['title', 'author', 'description', 'price', 'categories', 'publishedYear', 'isbn'],
    },

    // Response DTOs
    CreateBookResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Tạo sách thành công' },
            data: {
                type: 'object',
                properties: {
                    book: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: '66cfc3f480d7f8c2f5a71d2b' },
                            title: { type: 'string', example: 'Đắc Nhân Tâm' },
                            author: { type: 'string', example: 'Dale Carnegie' },
                            description: { type: 'string', example: 'Cuốn sách về nghệ thuật đối nhân xử thế' },
                            price: { type: 'number', example: 150000 },
                            categories: { 
                                type: 'array', 
                                items: { 
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string' },
                                        name: { type: 'string' },
                                        slug: { type: 'string' }
                                    }
                                },
                                example: [
                                    { _id: '66cfc3f480d7f8c2f5a71d2b', name: 'Kỹ năng sống', slug: 'ky-nang-song' },
                                    { _id: '66cfc3f480d7f8c2f5a71d2c', name: 'Tâm lý học', slug: 'tam-ly-hoc' }
                                ],
                                description: 'Array thông tin các thể loại (populated)'
                            },
                            publishedYear: { type: 'number', example: 2020 },
                            isbn: { type: 'string', example: '978-604-1-12345-6' },
                            stock: { type: 'number', example: 50 },
                            image: { type: 'string', example: 'https://example.com/dac-nhan-tam.jpg' },
                            createdAt: { type: 'string', format: 'date-time', example: '2024-01-15T10:00:00.000Z' },
                        },
                    },
                },
            },
        },
    },
    GetBooksResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Lấy danh sách sách thành công' },
            data: {
                type: 'object',
                properties: {
                    books: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Book'
                        }
                    },
                    pagination: {
                        type: 'object',
                        properties: {
                            currentPage: { type: 'number', example: 1 },
                            totalPages: { type: 'number', example: 5 },
                            totalBooks: { type: 'number', example: 50 },
                            hasNextPage: { type: 'boolean', example: true },
                            hasPrevPage: { type: 'boolean', example: false },
                            limit: { type: 'number', example: 10 },
                        },
                    },
                },
            },
        },
    },
    GetBookByIdResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Lấy thông tin sách thành công' },
            data: {
                type: 'object',
                properties: {
                    book: {
                        $ref: '#/components/schemas/Book'
                    },
                },
            },
        },
    },
    Book: {
        type: 'object',
        properties: {
            _id: { type: 'string', example: '66cfc3f480d7f8c2f5a71d2b' },
            title: { type: 'string', example: 'Đắc Nhân Tâm' },
            author: { type: 'string', example: 'Dale Carnegie' },
            description: { type: 'string', example: 'Cuốn sách về nghệ thuật đối nhân xử thế' },
            price: { type: 'number', example: 150000 },
            categories: { 
                type: 'array', 
                items: { 
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        slug: { type: 'string' }
                    }
                },
                example: [
                    { _id: '66cfc3f480d7f8c2f5a71d2b', name: 'Kỹ năng sống', slug: 'ky-nang-song' },
                    { _id: '66cfc3f480d7f8c2f5a71d2c', name: 'Tâm lý học', slug: 'tam-ly-hoc' }
                ],
                description: 'Array thông tin các thể loại (populated)'
            },
            publishedYear: { type: 'number', example: 2020 },
            isbn: { type: 'string', example: '978-604-1-12345-6' },
            stock: { type: 'number', example: 50 },
            image: { type: 'string', example: 'https://example.com/dac-nhan-tam.jpg' },
            createdBy: { type: 'string', example: '66cfc3f480d7f8c2f5a71d2c' },
            createdAt: { type: 'string', format: 'date-time', example: '2024-01-15T10:00:00.000Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2024-01-15T10:30:00.000Z' },
        },
    },
};
