import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { env } from './config/env';
import UserRouter from './routers/user.router';
import BookRouter from './routers/book.router';
import BorrowRouter from './routers/borrow.router';
import CategoryRouter from './routers/category.router';
import { swaggerSpec } from './swagger/swagger';
import swaggerUi from 'swagger-ui-express';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', UserRouter);
app.use('/books', BookRouter);
app.use('/borrow', BorrowRouter);
app.use('/categories', CategoryRouter);
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