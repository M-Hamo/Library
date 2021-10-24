const Test = require("../models/testModel");

const test = async (req, res) => {
  try {
    let newTest = await new Test(req.body);

    newTest.save((err, done) => {
      if (err) return res.status(400).send({ message: err.message, status: 1 });
      else return res.status(201).send({ message: "Test created", status: 0 });
    });
  } catch (err) {
    return res.status(400).json({ message: err.message, status: 1 });
  }
};

module.exports = {
  test,
};
