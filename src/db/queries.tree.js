const PrimaryTopic = require('./models').PrimaryTopic;
const SecondaryTopic = require('./models').SecondaryTopic;
const ThirdTopic = require('./models').ThirdTopic;
const FourthTopic = require('./models').FourthTopic;
const FifthTopic = require('./models').FifthTopic;
const Tree = require('./models').Tree;

const EventEmitter = require('events');

class Emitter extends EventEmitter {};

const buildDatabase = (callback) => {
    this.primaryTopic;
    this.secondaryTopic;
    this.thirdTopic;
    this.fourthTopic;
    this.fifthTopic;

    sequelize.sync({force: true}).then((res) => {
      PrimaryTopic.create({
        title: 'Title: Primary Topic 1',
        content: 'Content: Primary Topic 1'
      })
      .then((primaryTopic) => {
        this.primaryTopic = primaryTopic;
        SecondaryTopic.create({
          title: 'Title: Secondary Topic 1',
          content: 'Content: Secondary Topic 1',
          primaryTopicId: this.primaryTopic.id
        })
        .then((secondaryTopic) => {
          this.secondaryTopic = secondaryTopic;
          ThirdTopic.create({
            title: 'Title: Third Topic 1',
            content: 'Content: Third Topic 1',
            primaryTopicId: this.primaryTopic.id,
            secondaryTopicId: this.secondaryTopic.id
          })
          .then((thirdTopic) => {
            this.thirdTopic = thirdTopic;
            FourthTopic.create({
              title: 'Title: Fourth Topic 1',
              content: 'Content: Fourth Topic 1',
              primaryTopicId: this.primaryTopic.id,
              secondaryTopicId: this.secondaryTopic.id,
              thirdTopicId: this.thirdTopic.id
            })
            .then((fourthTopic) => {
              this.fourthTopic = fourthTopic;
              FifthTopic.create({
                title: 'Title: Fifth Topic 1',
                content: 'Content: Fifth Topic 1',
                primaryTopicId: this.primaryTopic.id,
                secondaryTopicId: this.secondaryTopic.id,
                thirdTopicId: this.thirdTopic.id,
                fourthTopicId: this.fourthTopic.id
              })
              .then((fifthTopic) => {
                this.fifthTopic = fifthTopic;
                done();
              })
              .catch((err) => {
                console.error(err);
                done();
              });
            })
            .catch((err) => {
              console.error(err);
              done();
            })
          })
          .catch((err) => {
            console.error(err);
            done();
          });
        })
        .catch((err) => {
          console.error(err);
          done();
        });
      })
      .catch((err) => {
        console.error(err);
        done();
      });
    });

  return callback(this.primaryTopic);
}

// const buildDatabaseNames = (DatabaseNameStr) => {
//   let databaseNameStr = {
//     capsSingular: DatabaseNameStr,
//     capsPlural: DatabaseNameStr + 's',
//     camelSingular: DatabaseNameStr.slice(0,1).toLowerCase + DatabaseNameStr.slice(1, DatabaseNameStr.length);
//     camelPlural: DatabaseNameStr.slice(0,1).toLowerCase + DatabaseNameStr.slice(1, DatabaseNameStr.length) + 's';
//   };
//   let CapsSingular = JSON.parse(databaseNameStr.capsSingular);
//   let CapsPlural = JSON.parse(databaseNameStr.capsPlural);
//   let camelSingular = JSON.parse(databaseNameStr.camelSingular);
//   let camelPlural = JSON.parse(databaseNameStr.camelPlural);
//   let names = [CapsSingular, CapsPlural, camelSingular, camelPlural];
//   return names;
// };
//
// const searchDatabase = (first, i, current, next, callback) => {
//   currentParsed = buildDatabaseNames(current);
//   if (first === current) {
//     let this.firstParsed = currentParsed.camelPlural;
//   }
//   nextParsed = buildDatabaseNames(next);
//   currentParsed.CapsSingular.all()
//   .then((res) => {
//     currentParsed.camelPlural = res;
//     if (if currentParsed.camelPlural.length !== 0) {
//       for (let j = 0; j < currentParsed.camelPlural.length; j++) {
//         if (first === current) {
//           this.firstParsed[i].currentParsed[j].title
//         } else {
//           this.firstParsed[i].c
//         }
//       }
//     }
//   })
//   .catch((err) => {
//     callback(err);
//   });
// };

const buildTopicTreeFromCurrentDatabase = (callback) => {
  let topicTree = [];
  let isFinished = false;
  const isSearchFinished = new Emitter();
  console.log(`emitter created`);
  isSearchFinished.on('finished', () => {
    console.log(`the search is done`);
    if (isFinished = true) {
      callback(null, this.primaryTopicsShort)
    };
  });
  /* need to go back and refactor -- violates DRY */
  this.primaryTopicsShort = [];
  PrimaryTopic.all()
  .then((primaryTopics) => {
    if (primaryTopics.length === 0) {
      return callback('no Primary Topics defined');
    }
    for (let i = 0; i < primaryTopics.length; i++) {
      this.primaryTopicsShort[i] = {
        title: primaryTopics[i].title,
        id: primaryTopics[i].id,
        secondaryTopics: []
      };
      PrimaryTopic.findById(this.primaryTopicsShort[i].id, {
        include: [{
          model: SecondaryTopic,
          as: 'secondaryTopics'
        }]
      })
      .then((currentPrimaryTopic) => {
        if (currentPrimaryTopic.secondaryTopics.length !== 0) {
          for (let j = 0; j < currentPrimaryTopic.secondaryTopics.length; j++) {
            this.primaryTopicsShort[i].secondaryTopics[j] = {
              title: currentPrimaryTopic.secondaryTopics[j].title,
              id: currentPrimaryTopic.secondaryTopics[j].id,
              thirdTopics: []
            };
            SecondaryTopic.findById(this.primaryTopicsShort[i].secondaryTopics[j].id, {
              include: [{
                model: ThirdTopic,
                as: 'thirdTopics'
              }]
            })
            .then((currentSecondaryTopic) => {
              if (currentPrimaryTopic.secondaryTopics.length - 1 === j) {
                isSearchFinished.emit('finished');
              }
              if (currentSecondaryTopic.thirdTopics.length !== 0) {
                for (let k = 0; k < currentSecondaryTopic.thirdTopics.length; k++) {
                  this.primaryTopicsShort[i].secondaryTopics[j].thirdTopics[k] = {
                    title: currentSecondaryTopic.thirdTopics[k].title,
                    id: currentSecondaryTopic.thirdTopics[k].id,
                    fourthTopics: []
                  };
                  ThirdTopic.findById(this.primaryTopicsShort[i].secondaryTopics[j].thirdTopics[k].id, {
                    include: [{
                      model: FourthTopic,
                      as: 'fourthTopics'
                    }]
                  })
                  .then((currentThirdTopics) => {
                    if (currentThirdTopics.fourthTopics.length !== 0) {
                      for (let l = 0; l < currentThirdTopics.fourthTopics.length; l++) {
                        this.primaryTopicsShort[i].secondaryTopics[j].thirdTopics[k].fourthTopics[k] = {
                          title: currentThirdTopics.fourthTopics[l].title,
                          id: currentThirdTopics.fourthTopics[l].id,
                          fifthTopics: []
                        }
                        FourthTopic.findById(this.primaryTopicsShort[i].secondaryTopics[j].thirdTopics[k].fourthTopics[l].id, {
                          include: [{
                            model: FifthTopic,
                            as: 'fifthTopics'
                          }]
                        })
                        .then((currentFourthTopics) => {
                          if (currentFourthTopics.fifthTopics.length !== 0) {
                            for (let m = 0; m < currentFourthTopics.fifthTopics.length; m++) {
                              this.primaryTopicsShort[i].secondaryTopics[j].thirdTopics[k].fourthTopics[k].fifthTopics[m] = {
                                title: currentFourthTopics.fifthTopics[m].title,
                                id: currentFourthTopics.fifthTopics[m].id
                              }
                            }
                          }
                        })
                        .catch((err) => {
                          callback(err);
                        });
                      }
                    }
                  })
                  .catch((err) => {
                    callback(err)
                  });
                }
              }
            })
            .catch((err) => {
              callback(err);
            })
          }
        }
      })
      .catch((err) => {
        callback(err);
      })
    }
  })
  .catch((err) => {
    callback(err);
  });
};

const emptyTree = (callback) => {
  return Tree.destroy({
    where: {},
    truncate: true
  })
  .then((deletedRecordsCount) => {
    callback(null, deletedRecordsCount);
  })
  .catch((err) => {
    callback(err);
  });
};

const setTree = (treeVal, callback) => {
  let treeDb = JSON.stringify(treeVal);
  return Tree.create({
    title: 'Tree',
    content: treeDb
  })
  .then((treeStr) => {
    let primaryTopics = JSON.parse(treeStr.content);
    callback(null, primaryTopics);
  })
  .catch((err) => {
    callback(err);
  });
}

let callCount = 0;

module.exports = {

  buildTree(callback) {
    let topicTree = '';
    emptyTree((errEmptyTree, res) => {

      if (errEmptyTree) {
        return callback(errEmptyTree);
      }
      buildTopicTreeFromCurrentDatabase((err, topicTreeAfterQuery) => {
        /* Why is this getting called multiple times? */
        if (err) {
          return callback(err);
        }
        topicTree = topicTreeAfterQuery;
        if (topicTree === undefined) {
          buildDatabase((temporaryPrimaryTopics) => {
            topicTree = temporaryPrimaryTopics;
            if (err) {
              callback(err);
            }
            topicTree = newQuery;
            callback(null, topicTree);
          });
        } else {
          /* this is violating DRY again */
          setTree(topicTree, (err, treePlaced) => {
            if (err) {
              callback(err);
            }
            console.log('second', treePlaced);
            let newTopicTree = treePlaced;
            callback(null, newTopicTree);
          });
        }
      });
    });
  },

  callTree(callback) {
    return Tree.findOne({
      where: {
        title: 'Tree'
      }
    })
    .then((treeStr) => {
      let primaryTopics = treeStr.content;
      primaryTopics = JSON.parse(primaryTopics);
      callback(null, primaryTopics);
    })
    .catch((err) => {
      callback(err);
    });
  }

}
