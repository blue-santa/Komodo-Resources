const fs = require('fs');
const path = require('path');

const base = path.join(__dirname + '../assets/docs/');

module.exports = {
  createTestFile() {
    fs.readFileSync(base + 'assetchains-guide-Komodo-Notary-Node.html');
  }
}
