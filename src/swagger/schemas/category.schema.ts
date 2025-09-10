// Category schemas cho Swagger
export const categorySchemas = {
    // Request DTOs
    CreateCategoryDto: {
        type: 'object',
        properties: {
            name: { type: 'string', example: 'Kỹ năng sống', maxLength: 100 },
        },
        required: ['name'],
    },
    UpdateCategoryDto: {
        type: 'object',
        properties: {
            name: { type: 'string', example: 'Kỹ năng sống', maxLength: 100 },
        },
    },

    // Response DTOs
    CreateCategoryResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Tạo thể loại thành công' },
            data: {
                type: 'object',
                properties: {
                    category: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: '66cfc3f480d7f8c2f5a71d2b' },
                            name: { type: 'string', example: 'Kỹ năng sống' },
                            slug: { type: 'string', example: 'ky-nang-song' },
                            createdAt: { type: 'string', format: 'date-time', example: '2024-01-15T10:00:00.000Z' },
                        },
                    },
                },
            },
        },
    },
    GetCategoriesResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Lấy danh sách thể loại thành công' },
            data: {
                type: 'object',
                properties: {
                    categories: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Category'
                        }
                    },
                    pagination: {
                        type: 'object',
                        properties: {
                            currentPage: { type: 'number', example: 1 },
                            totalPages: { type: 'number', example: 3 },
                            totalCategories: { type: 'number', example: 25 },
                            hasNextPage: { type: 'boolean', example: true },
                            hasPrevPage: { type: 'boolean', example: false },
                            limit: { type: 'number', example: 10 },
                        },
                    },
                },
            },
        },
    },
    GetCategoryByIdResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Lấy thông tin thể loại thành công' },
            data: {
                type: 'object',
                properties: {
                    category: {
                        $ref: '#/components/schemas/Category'
                    },
                },
            },
        },
    },
    UpdateCategoryResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Cập nhật thể loại thành công' },
            data: {
                type: 'object',
                properties: {
                    category: {
                        $ref: '#/components/schemas/Category'
                    },
                },
            },
        },
    },
    DeleteCategoryResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Xóa thể loại thành công' },
        },
    },
    Category: {
        type: 'object',
        properties: {
            _id: { type: 'string', example: '66cfc3f480d7f8c2f5a71d2b' },
            name: { type: 'string', example: 'Kỹ năng sống' },
            slug: { type: 'string', example: 'ky-nang-song' },
            createdAt: { type: 'string', format: 'date-time', example: '2024-01-15T10:00:00.000Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2024-01-15T10:30:00.000Z' },
        },
    },
};
