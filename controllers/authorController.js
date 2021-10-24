const Author = require("../models/authorModel");

// All Authors routes
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
    // res.redirect(`authors/${newAuthor.id}`);
    res.redirect(`authors`);
  } catch (err) {
    return res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
};

module.exports = {
  renderAllAuthors,
  newAuthorRoute,
  addNewAuthor,
};
