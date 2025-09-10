import { Router } from 'express';
import { createBook, getBooks, getBookById } from "../controllers/book.controller";
import { validateCreateBook } from "../middlewares/book.validate";
import { authenticateToken, requireAdmin } from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * /books:
 *   post:
 *     tags: [Books]
 *     summary: Tạo sách mới (chỉ admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookDto'
 *           examples:
 *             sample:
 *               value:
 *                 title: "Đắc Nhân Tâm"
 *                 author: "Dale Carnegie"
 *                 description: "Cuốn sách về nghệ thuật đối nhân xử thế"
 *                 price: 150000
 *                 categories: ["66cfc3f480d7f8c2f5a71d2b", "66cfc3f480d7f8c2f5a71d2c"]
 *                 publishedYear: 2020
 *                 isbn: "978-604-1-12345-6"
 *                 stock: 50
 *                 image: "https://example.com/dac-nhan-tam.jpg"
 *     responses:
 *       201:
 *         description: Tạo sách thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBookResponse'
 */
router.post('/', authenticateToken, requireAdmin, validateCreateBook, createBook);

/**
 * @swagger
 * /books:
 *   get:
 *     tags: [Books]
 *     summary: Lấy danh sách sách
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng sách mỗi trang
 *     responses:
 *       200:
 *         description: Lấy danh sách sách thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetBooksResponse'
 */
router.get('/', getBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     tags: [Books]
 *     summary: Lấy chi tiết sách theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sách
 *     responses:
 *       200:
 *         description: Lấy thông tin sách thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetBookByIdResponse'
 *       404:
 *         description: Không tìm thấy sách
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', getBookById);

export default router;
