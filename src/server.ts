import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { env } from './config/env';
import ProductRouter from './routers/product.router';
import UserRouter from './routers/user.router';
import { swaggerSpec } from './swagger/swagger';
import swaggerUi from 'swagger-ui-express';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', UserRouter);
app.use('/api/products', ProductRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

try {
    mongoose.connect(env.MONGODB_URI);
    console.log('MongoDB connected');
    app.listen(env.PORT, () => {
        console.log(`Server running at http://localhost:${env.PORT}`);
        console.log(`Swagger docs at http://localhost:${env.PORT}/api-docs`);
    })
} catch (error) {
    console.log('MongoDB connection failed');
}