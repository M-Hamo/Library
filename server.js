// check if with environment we are using
process.env.NODE_ENV !== "production" && require("dotenv").config();

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
/* Routes */
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authorsRouter");
const bookRouter = require("./routes/booksRouter");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/uploads")));

const initialMongo = async () => {
  //   const db = mongoose.connection;
  try {
    // db.once("open", () => console.log("connected to mongodb"));
    await mongoose
      .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch((err) => handell(err));
  } catch (err) {
    console.log(err);
  }
};

initialMongo();

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

const port = process.env.PORT || 3100;
app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});
