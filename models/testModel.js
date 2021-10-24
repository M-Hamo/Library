const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);


module.exports = mongoose.model("test", TestSchema);