const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const tagController = require("../controllers/tagController");

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Tag management
 */

router.post("/", authMiddleware, tagController.createTag);
router.get("/", authMiddleware, tagController.getTags);

module.exports = router;