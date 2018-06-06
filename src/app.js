const express = require("express");
const router = express.Router();
const app = express();

const routeConfig = require("./config/route-config.js");

routeConfig.init(app);

module.exports = app;
