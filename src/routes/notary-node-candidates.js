const express = require("express");
const router = express.Router();

const notaryNodeCandidateController = require("../controllers/notaryNodeCandidateController");

router.get("/notary-node-candidates", notaryNodeCandidateController.index);

module.exports = router;
