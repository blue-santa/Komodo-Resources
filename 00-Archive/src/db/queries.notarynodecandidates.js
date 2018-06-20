const NotaryNodeCandidate = require("./models").NotaryNodeCandidate;

module.exports = {

  getAllNotaryNodeCandidates(callback){
    return NotaryNodeCandidate.all()
    .then((notarynodecandidates) => {
      callback(null, notarynodecandidates);
    })
    .catch((err) => {
      callback(err);
    });
  }

}
