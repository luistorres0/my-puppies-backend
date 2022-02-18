const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", (req, res, next) => {
  res.json({
    data: {
      message: "This is a test. It worked!",
    },
  });
});

module.exports = app;
