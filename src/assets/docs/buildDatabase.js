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

const parseContentIndex = function(indexFile, newCurrentCount, callback) {
  let captionMarker = ':caption: ';
  let nextSectionMarker = '..';
  let nextLineMarker = '\n';
  let currentCount = newCurrentCount;
  let newIndexFile;
  let front;
  let rear;
  newIndexFile = indexFile;
  front = newIndexFile.indexOf(captionMarker); // Cut to the next caption
  let isLast = front === -1;
  if (isLast) {
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
        let nextPush = newIndexFile.slice(0, rear);
        newIndexFile = newIndexFile.slice(rear);
        if (nextPush.includes('.rst')) {
          let rstRear = nextPush.indexOf('.rst');
          nextPush = nextPush.slice(0, rstRear);
          nextPush = nextPush + '.html';
        }
        subbranches.push(nextPush);
      } else if (newIndexFile.indexOf(nextLineMarker) === -1) {
        if (newIndexFile.length > 0) {
          console.log(`***\n\n***Something's wrong.\n\nThe newIndexFile is: ${newIndexFile}\n\n`);
        }
      }
    }
    navbarTreeArray[currentCount - 1].subbranches = subbranches;
    if (typeof callback === 'function') {
      callback(null, navbarTreeArray);
    }
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
      if (newIndexFile.indexOf(nextSectionMarker) !== 0) {
        rear = newIndexFile.indexOf(nextLineMarker);
        let nextPush = newIndexFile.slice(0, rear);
        newIndexFile = newIndexFile.slice(rear);
        if (nextPush.includes('.rst')) {
          let rstRear = nextPush.indexOf('.rst');
          nextPush = nextPush.slice(0,rstRear);
          nextPush = nextPush + '.html';
        }
        subbranches.push(nextPush);
      } else if (newIndexFile.indexOf(nextSectionMarker === 0)) {
      } else {
        console.error(`ya dun messed up, son`);
        process.exit();
      }
    }
    navbarTreeArray[currentCount].subbranches = subbranches;
    currentCount = currentCount + 1;
    return parseContentIndex(newIndexFile, currentCount, callback);
  }
};

const getFileValue = (filePath, callback) => {
  let pathValue;
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, 'utf8', (err, res) => {
      if (err) {
        console.error(`There was an error while perf fs.readFile: ${err}`);
        process.exit();
      }
      callback(null, res);
    });
  } else if (fs.existsSync(filePath + '.html')) {
    fs.readFile(filePath + '.html', 'utf8', (err, res) => {
      if (err) {
        console.error(`There was an error while perf fs.readFile: ${err}`);
        process.exit();
      }
      callback(null, res);
    });
  }
}

setTimeout(() => {
  let newTreeThing = [];
  parseContentIndex(contentIndex, 0, (err, res) => {
    newTreeThing = res;
  });

  sequelize.sync({ force: true }).then((res) => {
    this.primaryTopic;
    this.secondaryTopic;
    PrimaryTopic.create({
      title: newTreeThing[0].title,
      content: 'I\'m a little teapot'
    }).then((primaryTopic) => {
      this.primaryTopic = primaryTopic;
      let options;
      for (let i = 0; i < newTreeThing[0].subbranches.length; i++) {
        console.log(i);
        getFileValue(path.join(base + '/' + newTreeThing[0].subbranches[i]), (err, res) => {
          if (err) {
            console.error(err);
            process.exit();
          }
          options = {
            title: newTreeThing[0].subbranches[i],
            content: res,
            primaryTopicId: this.primaryTopic.id
          };
          SecondaryTopic.create(options).then((secondaryTopic) => {
            this.secondaryTopic = secondaryTopic;
            setTimeout(() => { process.exit() }, 5000);
          })
          .catch((err) => {
            console.error(err);
            return process.exit();
          });
        });
      }
    })
    .catch((err) => {
      console.error(err);
      return process.exit();
    });
  });
}, 1000);

module.exports = {

}
