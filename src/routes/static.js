const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Welcome to Komodo's Resource Repository")
});

router.get("/marco", (req, res, next) => {
  res.send(`polo: ${process.env.testSecret}`);
});

module.exports = router;
