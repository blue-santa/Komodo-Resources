const path = require('path');
const http = require('http');

const app = require(path.join(__dirname + '/app'));
const server = http.createServer(app);

let port = 3000;

server.listen(port);

server.on('listening', () => {
  console.log(`server is listening on port ${port}`);
});
