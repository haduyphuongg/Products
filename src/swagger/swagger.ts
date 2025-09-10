import swaggerJSDoc from 'swagger-jsdoc';
import { env } from '../config/env';
import { authSchemas } from './schemas/auth.schema';
import { bookSchemas } from './schemas/book.schema';
import { borrowSchemas } from './schemas/borrow.schema';
import { categorySchemas } from './schemas/category.schema';

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API tài liệu',
            version: '1.0.0',
            description: 'API tài liệu cho hệ thống',
        },
        servers: [
            { url: `https://products-f3qm.onrender.com`, description: 'Local Development', },
            { url: `http://localhost:${env.PORT}`, description: 'Local Development', },
        ],
        tags: [
            {
                name: 'Auth',
                description: 'Xác thực và quản lý người dùng'
            },
            {
                name: 'Books',
                description: 'Quản lý sách'
            },
            {
                name: 'Borrow',
                description: 'Mượn và trả sách'
            },
            {
                name: 'Categories',
                description: 'Quản lý thể loại sách'
            }
        ],
        components: {
            schemas: {
                ...authSchemas,
                ...bookSchemas,
                ...borrowSchemas,
                ...categorySchemas,
            },
            //   Nếu bạn có JWT:
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'JWT token từ đăng nhập'
                }
            }
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ["src/routers/*.ts", "src/controllers/*.ts"] // nơi chứa JSDoc
});
