const Author = require("../models/authorModel");
const Book = require("../models/booksModel");

// All Authors route
const renderAllAuthors = async (req, res) => {
  let searchOptions = {};
  if (!!req.query.name) {
    searchOptions.name = new RegExp(req.query.name.trim(), "i");
  }
  try {
    let authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch (err) {
    res.redirect("/");
  }
};

// New Author Route
const newAuthorRoute = async (req, res) => {
  res.render("authors/new", { author: new Author() });
};

// Creating new Author
const addNewAuthor = async (req, res) => {
  let author = new Author({ name: req.body.name });
  try {
    await author.save();
    res.redirect(`authors/${author.id}`);
    res.redirect(`authors`);
  } catch (err) {
    return res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
};

const showAuthor = async (req, res) => {
  let author;
  let books;
  try {
    author = await Author.findById(req.params.id.trim());
    books = await Book.find({ author: author.id }).limit(6).exec();

    res.render("authors/show", { author, booksByAuthor: books });
  } catch (err) {
    console.log(err)
    res.render("/authors");
  }
};

const editAuthor = async (req, res) => {
  let id = req.params.id.trim();
  try {
    let author = await Author.findById(id);
    res.render("authors/edit", { author: author });
  } catch (err) {
    res.render("/authors");
  }
};

const updateAuthor = async (req, res) => {
  let id = req.params.id.trim();
  let author;
  try {
    author = await Author.update({ _id: id }, { $set: req.body });
    res.redirect(`/authors/${id}`);
  } catch (err) {
    if (!author) {
      return res.redirect("/");
    } else {
      return res.render("authors/new", {
        author: author,
        errorMessage: "Error updating Author",
      });
    }
  }
};

const deleteAuthor = async (req, res) => {
  let id = req.params.id.trim();
  let author;
  try {
    author = await Author.deleteOne({ _id: id });
    res.redirect(`/authors`);
  } catch (err) {
    if (!author) {
      return res.redirect("/");
    } else {
      res.redirect(`authors/${author.id}`);
    }
  }
};

module.exports = {
  renderAllAuthors,
  newAuthorRoute,
  addNewAuthor,
  showAuthor,
  editAuthor,
  updateAuthor,
  deleteAuthor,
};
