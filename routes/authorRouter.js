const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
// All Authors routes
router.get("/", authorController.renderAllAuthors);
// New Author Route
router.get("/new", authorController.newAuthorRoute);
// Create Author Route
router.post("/", authorController.addNewAuthor);
module.exports = router;
