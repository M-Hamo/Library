const mongoose = require("mongoose");
// const path = require("path");
// const coverImageBasePath = "uploads/booksCovers";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  coverImage: {
    type: Buffer,
    required: true,
  },
  coverImageType: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author",
  },
});

BookSchema.virtual("coverImagePath").get(function () {
  if (!!this.coverImage && !!this.coverImageType) {
    // return path.join("/", coverImageBasePath, this.coverImageName);
    return `data:${
      this.coverImageType
    };charset=tuf-8;base64,${this.coverImage.toString("base64")}`;
  }
});

module.exports = mongoose.model("Book", BookSchema);
// module.exports.coverImageBasePath = coverImageBasePath;
