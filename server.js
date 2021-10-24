if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
app.use("/api/test", require("./routes/testRouter"));

const port = process.env.PORT || 3100;
app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});
