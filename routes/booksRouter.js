const express = require("express");
const router = express.Router();
const bookController = require("../controllers/booksController");

// All Books route
router.get("/", bookController.renderAllBooks);
// New Book Route
router.get("/new", bookController.newBookRoute);
// Create Book Route
router.post(
  "/",
  // bookController.upload.single("cover"),
  bookController.addNewBook
);

router.get("/:id", bookController.showBook)

router.get("/:id/edit", bookController.editBook)

router.put("/:id", bookController.updateBook)

router.delete("/:id", bookController.deleteBook)

module.exports = router;
