import { Router } from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from "../controllers/category.controller";
import { validateCreateCategory, validateUpdateCategory } from "../middlewares/category.validate";
import { authenticateToken, requireAdmin } from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * /categories:
 *   post:
 *     tags: [Categories]
 *     summary: Tạo thể loại mới (chỉ admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryDto'
 *           examples:
 *             sample:
 *               value:
 *                 name: "Kỹ năng sống"
 *                 slug: "ky-nang-song"
 *     responses:
 *       201:
 *         description: Tạo thể loại thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateCategoryResponse'
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc tên thể loại đã tồn tại
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
 *       403:
 *         description: Không có quyền admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', authenticateToken, requireAdmin, validateCreateCategory, createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: Lấy danh sách thể loại
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
 *         description: Số lượng thể loại mỗi trang
 *     responses:
 *       200:
 *         description: Lấy danh sách thể loại thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCategoriesResponse'
 */
router.get('/', getCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Lấy chi tiết thể loại theo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của thể loại
 *     responses:
 *       200:
 *         description: Lấy thông tin thể loại thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCategoryByIdResponse'
 *       404:
 *         description: Không tìm thấy thể loại
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', getCategoryById);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Cập nhật thể loại (chỉ admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của thể loại
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategoryDto'
 *     responses:
 *       200:
 *         description: Cập nhật thể loại thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateCategoryResponse'
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc tên thể loại đã tồn tại
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
 *       403:
 *         description: Không có quyền admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Không tìm thấy thể loại
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', authenticateToken, requireAdmin, validateUpdateCategory, updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Xóa thể loại (chỉ admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của thể loại
 *     responses:
 *       200:
 *         description: Xóa thể loại thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteCategoryResponse'
 *       401:
 *         description: Không có token hoặc token không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Không có quyền admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Không tìm thấy thể loại
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', authenticateToken, requireAdmin, deleteCategory);

export default router;
