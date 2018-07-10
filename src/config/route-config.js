module.exports = {
  init(app){
    const staticRoutes = require('../routes/static');
    const primaryTopicRoutes = require('../routes/primaryTopics');

    app.use(staticRoutes);
    app.use(primaryTopicRoutes);
  }
}
