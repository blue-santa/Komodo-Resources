const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
  res.send('Welcome to Komodo Resources', process.env.prodDBPassword);
});

module.exports = router;
