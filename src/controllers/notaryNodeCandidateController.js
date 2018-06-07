const notaryNodeCandidateQueries = require("../db/queries.notarynodecandidates.js");

module.exports = {
  index(req, res, next){
    notaryNodeCandidateQueries.getAllNotaryNodeCandidates((err, notarynodecandidates) => {
      if (err) {
        res.redirect(500, "static/index");
      } else {
        res.render("notary-node-candidates/index", {notarynodecandidates});
      }
    });
  }
}
