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
let captionMarker = ':caption: ';
let nextSectionMarker = '..';
let nextLineMarker = '\n';

const parseContentIndex = function(indexFile, newCurrentCount) {
  let currentCount = newCurrentCount;
  console.log(`currentCount is: ${currentCount}`);
  let newIndexFile;
  let front;
  let rear;
  newIndexFile = indexFile;
  front = newIndexFile.indexOf(captionMarker); // Cut to the next caption
  let isLast = front === -1;
  if (isLast) {
    console.log(`this is the last one`);
    let subbranches = [];
    while (newIndexFile.length > 0) {
      while (newIndexFile.indexOf(nextLineMarker) === 0 || newIndexFile.indexOf(' ') === 0) {
        if (newIndexFile.indexOf(nextLineMarker) === 0) {
          newIndexFile = newIndexFile.slice(nextLineMarker.length);
        } else if (newIndexFile.indexOf(' ') === 0) {
          newIndexFile = newIndexFile.slice(1);
        } else {
          console.error(`ya dun messed up!`);
          process.exit();
        }
      }
      if (newIndexFile.indexOf(nextLineMarker) !== -1) {
        rear = newIndexFile.indexOf(nextLineMarker);
        subbranches.push(newIndexFile.slice(0, rear));
        newIndexFile = newIndexFile.slice(rear);
      } else if (newIndexFile.indexOf(nextLineMarker) === -1) {
        if (newIndexFile.length > 0) {
          console.log(`***\n\n***Something's wrong.\n\nThe newIndexFile is: ${newIndexFile}\n\n`);
        }
      }
    }
    navbarTreeArray[currentCount - 1].subbranches = subbranches;
    return false;
  } else {
    newIndexFile = newIndexFile.slice(front + captionMarker.length);
    rear = newIndexFile.indexOf(nextLineMarker);
    let curPrimaryTopicTitle = newIndexFile.slice(0, rear);
    navbarTreeArray.push({
      title: curPrimaryTopicTitle,
      subbranches: ''
    });
    newIndexFile = newIndexFile.slice(rear);
    let subbranches = [];
    while (newIndexFile.indexOf(nextSectionMarker) !== 0 && newIndexFile.indexOf(nextLineMarker) !== -1 && newIndexFile.indexOf(nextSectionMarker) !== -1) {
      while (newIndexFile.indexOf(nextLineMarker) === 0 || newIndexFile.indexOf(' ') === 0) {
        if (newIndexFile.indexOf(nextLineMarker) === 0) {
          newIndexFile = newIndexFile.slice(nextLineMarker.length);
        } else if (newIndexFile.indexOf(' ') === 0) {
          newIndexFile = newIndexFile.slice(1);
        } else {
          console.error(`ya dun messed up`);
          process.exit();
        }
      }
      /* need to switch the above so that the ' ' part comes during the push process, since we're clipping through lines already */

      console.log('now its at: ' + newIndexFile.indexOf(nextLineMarker));
      if (newIndexFile.indexOf(nextSectionMarker) !== 0) {
        rear = newIndexFile.indexOf(nextLineMarker);
        let nextSubbranch = newIndexFile.slice(0, rear);
        subbranches.push(nextSubbranch);
        newIndexFile = newIndexFile.slice(rear);
      } else if (newIndexFile.indexOf(nextSectionMarker === 0)) {
      } else {
        console.error(`ya dun messed up, son`);
        process.exit();
      }
    }
    navbarTreeArray[currentCount].subbranches = subbranches;
    currentCount = currentCount + 1;
    return parseContentIndex(newIndexFile, currentCount);
  }
};

setTimeout(() => {
  parseContentIndex(contentIndex, 0);
  fs.readFile(base + '/home-komodo.html', 'utf8', (err, res) => {
    if (err) {
      console.error(err);
      process.exit();
    }
    testSecondary = res;
    return;
  });

  sequelize.sync({ force: true }).then((res) => {
    this.primaryTopic;
    this.secondaryTopic;
    PrimaryTopic.create({
      title: navbarTreeArray[0].title,
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
        for (let i = 0; i < navbarTreeArray.length; i++) {
          console.log(`navbarTreeArray[${i}] is:\n${navbarTreeArray[i].title}\n\n`);
          for (let j = 0; j < navbarTreeArray[i].subbranches.length; j++) {
            console.log(`navbarTreeArray[${i}].subbranches[${j}] is:\n${navbarTreeArray[i].subbranches[j]}\n\n`);
          }
        }
        process.exit();
      })
      .catch((err) => {
        console.error(err);
        return process.exit();
      });
    })
    .catch((err) => {
      console.error(err);
      return process.exit();
    });
  });
}, 1000);

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
