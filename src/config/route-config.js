module.exports = {
  init(app){
    console.log(__dirname);
    const staticRoutes = require('../routes/static');
    app.use(staticRoutes);
  }
}
