const express = require("express");
const router = express.Router();

const staticController = require("../controllers/staticController");

router.get("/", staticController.index);

router.get("/marco", (req, res, next) => {
  res.send(`polo: ${process.env.testSecret}`);
});

module.exports = router;
