module.exports = {
  init(app) {
    const staticRoutes = require('../routes/static');
    const primaryTopicRoutes = require('../routes/primaryTopics');
    const secondaryTopicRoutes = require('../routes/secondaryTopics');
    const thirdTopicRoutes = require('../routes/thirdTopics');
    const fourthTopicRoutes = require('../routes/fourthTopics');
    const fifthTopicRoutes = require('../routes/fifthTopics');

    app.use(staticRoutes);
    app.use(primaryTopicRoutes);
    app.use(secondaryTopicRoutes);
    app.use(thirdTopicRoutes);
    app.use(fourthTopicRoutes);
    app.use(fifthTopicRoutes);
  }
}
