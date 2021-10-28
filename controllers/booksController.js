const Author = require("../models/authorModel");
const Book = require("../models/booksModel");
//
// const multer = require("multer");
// const path = require("path");
// const uploadPath = path.join("public", Book.coverImageBasePath);
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
// next require dealing with file system
const fs = require("fs");

// const upload = multer({
//   dest: uploadPath,
//   fileFilter: (req, file, callback) => {
//     callback(null, imageMimeTypes.includes(file.mimetype));
//   },
// });

// All Books route
const renderAllBooks = async (req, res) => {
  let query = Book.find();
  if (!!req.query.title) {
    query = query.regex("title", new RegExp(req.query.title.trim(), "i"));
  }
  if (!!req.query.publishedBefore) {
    query = query.lte("publishDate", req.query.publishedBefore);
  }
  if (!!req.query.publishedAfter) {
    query = query.gte("publishDate", req.query.publishedAfter);
  }
  // if (!!req.query.title) {
  //   searchParams.title = new RegExp(req.query.title.trim(), "i");
  // }
  try {
    const books = await query.exec();
    res.render("books/index", {
      books: books,
      searchOptions: req.query,
    });
  } catch (error) {
    res.render("/");
  }
};

// New Book Route
const newBookRoute = async (req, res) => {
  renderNewPage(res, new Book());
};

// Creating new Book
const addNewBook = async (req, res) => {
  // const fileName = !!req.file ? req.file.filename : null;
  let book = new Book({
    title: req.body.title,
    author: req.body.author.trim(),
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    // coverImageName: fileName,
    description: req.body.description,
  });

  saveCover(book, req.body.cover);

  try {
    const newBook = await book.save();
    // res.redirect(`books/${newAuthor.id}`);
    res.redirect(`books`);  
  } catch (err) {
    //   if (!!book.coverImageName) removeBookCover(book.coverImageName);
      renderNewPage(res, book, true);
  }
};

const renderNewPage = async (res, book, hasError = false) => {
  try {
    const authors = await Author.find({});
    const params = { authors: authors, book: book };
    if (hasError) params.errorMessage = "Error Creating Book";
    res.render("books/new", params);
  } catch {
    res.redirect("/books");
  }
};

// const removeBookCover = (fileName) => {
//   fs.unlink(path.join(uploadPath, fileName), (err) => {
//     if (err) return console.error(err);
//   });
// };

const saveCover = (book, coverEncoded) => {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, "base64");
    book.coverImageType = cover.type;
  }
};

module.exports = {
  renderAllBooks,
  newBookRoute,
  // upload,
  addNewBook,
};
