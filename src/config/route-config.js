module.exports = {
  init(app) {
    const staticRoutes = require('../routes/static');
    const primaryTopicRoutes = require('../routes/primaryTopics');
    const secondaryTopicRoutes = require('../routes/secondaryTopics');
    const thirdTopicRoutes = require('../routes/thirdTopics');

    app.use(staticRoutes);
    app.use(primaryTopicRoutes);
    app.use(secondaryTopicRoutes);
    app.use(thirdTopicRoutes);
  }
}
