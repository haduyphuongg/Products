import { Router } from 'express';
import { borrowBook, returnBook, getBorrowHistory } from "../controllers/borrow.controller";
import { authenticateToken } from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * /borrow/{bookId}:
 *   post:
 *     tags: [Borrow]
 *     summary: Mượn sách nếu còn trong kho
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sách muốn mượn
 *     responses:
 *       201:
 *         description: Mượn sách thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BorrowBookResponse'
 *       400:
 *         description: Sách hết kho hoặc đã mượn
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Không có token hoặc token không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Không tìm thấy sách
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/:bookId', authenticateToken, borrowBook);

/**
 * @swagger
 * /borrow/return/{bookId}:
 *   post:
 *     tags: [Borrow]
 *     summary: Trả sách
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sách muốn trả
 *     responses:
 *       200:
 *         description: Trả sách thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnBookResponse'
 *       400:
 *         description: Chưa mượn sách hoặc đã trả rồi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Không có token hoặc token không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Không tìm thấy sách
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/return/:bookId', authenticateToken, returnBook);

/**
 * @swagger
 * /borrow/history:
 *   get:
 *     tags: [Borrow]
 *     summary: Lịch sử mượn trả của bản thân
 *     security:
 *       - bearerAuth: []
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
 *         description: Số lượng records mỗi trang
 *     responses:
 *       200:
 *         description: Lấy lịch sử mượn trả thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetBorrowHistoryResponse'
 *       401:
 *         description: Không có token hoặc token không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/history', authenticateToken, getBorrowHistory);

export default router;
