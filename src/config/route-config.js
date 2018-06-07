module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const notaryNodeCandidateRoutes = require("../routes/notary-node-candidates");

    app.use(staticRoutes);
    app.use(notaryNodeCandidateRoutes);
  }
}
