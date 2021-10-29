const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
// All Authors routes
router.get("/", authorController.renderAllAuthors);
// New Author Route
router.get("/new", authorController.newAuthorRoute);
// Create Author Route
router.post("/", authorController.addNewAuthor);

router.get("/:id", authorController.showAuthor);

router.get("/:id/edit", authorController.editAuthor);

router.put("/:id", authorController.updateAuthor);

router.delete("/:id", authorController.deleteAuthor);

module.exports = router;
