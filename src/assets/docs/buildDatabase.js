const fs = require('fs-extra');
const path = require('path');
const chprc = require('child_process');
const prompt = require('prompt');

const sequelize = require('../../db/models/index').sequelize;
const PrimaryTopic = require('../../db/models').PrimaryTopic;
const SecondaryTopic = require('../../db/models').SecondaryTopic;

const base = path.join(__dirname + '/SidRebuild/docs');

/* Starting next */

let contentIndex;
fs.readFile(path.join(__dirname + '/KomodoPlatformdocs/docs/source/index.rst'), 'utf8', (err, res) => {
  if (err) {
    console.error(err);
    process.exit();
  }
  contentIndex = res;
  return;
});

let navbarTreeArray = [];

const parseContentIndex = function(indexFile) {
  console.log(`\n\n***\n\nthe indexFile var is:\n\n${indexFile}\n\n***\n\n`);
  let newIndexFile;
  let front;
  let rear;
  newIndexFile = indexFile;
  front = newIndexFile.indexOf(':caption:'); // Cut to the next caption
  if (front === -1) {
    return false;
  } else {
    newIndexFile = newIndexFile.slice(front);
    rear = newIndexFile.indexOf('\n');
    navbarTreeArray.push(newIndexFile.slice(0, rear));
    newIndexFile = newIndexFile.slice(rear);
    return parseContentIndex(newIndexFile);
  }
}

setTimeout(() => {
  parseContentIndex(contentIndex);
  fs.readFile(base + '/home-komodo.html', 'utf8', (err, res) => {
    if (err) {
      console.error(err);
    }
    testSecondary = res;
    return;
  });

  sequelize.sync({ force: true }).then((res) => {
    this.primaryTopic;
    this.secondaryTopic;
    PrimaryTopic.create({
      title: navbarTreeArray[0],
      content: contentIndex
    }).then((primaryTopic) => {
      this.primaryTopic = primaryTopic;
      SecondaryTopic.create({
        title: 'Test run',
        content: testSecondary,
        primaryTopicId: this.primaryTopic.id
      }).then((secondaryTopic) => {
        this.secondaryTopic = secondaryTopic;
        console.log(`finished`);
        process.exit();
      });
    })
    .catch((err) => {
      return console.error(err);
      process.exit();
    });
  });
}, 3000);

let testSecondary;

/*
  set base path within directory

  make folder structure for html

fs.existsSync(path); /// (returns boolean)
fs.mkdirSync(path[, mode], callback);
fs.readdirSync(path[, options]);

  transfer all .rst files to .html

*/

/*
  Filling the database

  ask: I'm going to import the index.rst file. Is this it?
  read .rst directory

  translate .rst index directory into structure for database
  go through each file and place it into database
    set the title
    set the parent's id
    set the content as a string
    set the appropriate css file

console.log('finished!');

interesting note:
var fs = require('fs');
var deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

*/


module.exports = {

}
