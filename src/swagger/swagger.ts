import swaggerJSDoc from 'swagger-jsdoc';
import { env } from '../config/env';
import { productSchemas, authSchemas } from './schemas';

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API tài liệu',
            version: '1.0.0',
            description: 'API tài liệu cho hệ thống',
        },
        servers: [
            { url: `http://localhost:${env.PORT}`, description: 'Local Development' },
        ],
        tags: [
            {
                name: 'Auth',
                description: 'Xác thực và quản lý người dùng'
            },
            {
                name: 'Products',
                description: 'Quản lý sản phẩm'
            }
        ],
        components: {
            schemas: {
                ...productSchemas,
                ...authSchemas,
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
