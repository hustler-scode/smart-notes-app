const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile management
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 themePreference:
 *                   type: string
 *                 isDarkMode:
 *                   type: boolean
 */
router.get("/me", authMiddleware, userController.getProfile);

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     summary: Update logged-in user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.put("/me", authMiddleware, userController.updateProfile);

/**
 * @swagger
 * /api/users/me:
 *   delete:
 *     summary: Delete logged-in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/me", authMiddleware, userController.deleteProfile);

module.exports = router;