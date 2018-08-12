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

const buildDatabaseNames = (DatabaseNameStr, callback) => {
  let camelSingular = DatabaseNameStr.slice(0,1);
  camelSingular = camelSingular.toLowerCase();
  camelSingular = camelSingular + DatabaseNameStr.slice(1, DatabaseNameStr.length);
  let camelPlural = DatabaseNameStr.slice(0,1);
  camelPlural = camelPlural.toLowerCase();
  camelPlural = camelPlural + DatabaseNameStr.slice(1, DatabaseNameStr.length) + 's';
  let databaseNameStr = `{ "capsSingular": ${"\"" + DatabaseNameStr + "\""}, "capsPlural": ${"\"" + DatabaseNameStr + 's' + "\""}, "camelSingular": ${"\"" + camelSingular + "\""}, "camelPlural": ${"\"" + camelPlural + "\""} }`;
  let names = JSON.parse(databaseNameStr);
  return callback(names);
};

const isAnotherDatabase = (DatabaseName, id, NextDatabaseName) => {
  DatabaseName.findById({
    where: {
      id: id
    }
  })
  .then((res) => {
    if (typeof res.NextDatabaseName === undefined) {
      return false;
    } else if (res.NextDatabaseName.length === 0) {
      return false;
    } else {
      return true;
    }
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });
};

const searchDatabase = (first, i, current, next, list, callback) => {
  if (typeof first === 'string') {
    first = buildDatabaseNames(first);
    current = buildDatabaseNames(current);
    next = buildDatabaseNames(next);
  }
  if (first === current) {
    this.first = current;
    let topicTree = [];
    const isSearchFinished = new Emitter();
    console.log(`emitter created`);
    isSearchFinished.on('finished', () => {
      console.log(`the search is done`);
      callback(null, this.primaryTopicsShort);
    });
  }
  current.CapsSingular.all()
  .then((res) => {
    current.camelPlural = res;
    if (if current.camelPlural.length !== 0) {
      for (let j = 0; j < currentParsed.camelPlural.length; j++) {
        if (first === current) {
          this.first[i].current[j].title = current.camelPlural[j].title,
          this.first[i].current[j].id = current.camelPlural[j].id
          next.camelSingular = []
        } else {
          this.first[i]..current[j].title = current.camelPlural[j].title,
          this.first[i].id = current.camelPlural[j].id,
          next.camelSingular = []
        }
        let isNext = isAnotherDatabase(current.)
        searchDatabase(null, j, next, list[i + 1], list, callback).bind(this);
      }
    } else {
      callback(null, this.first);
    }
  })
  .catch((err) => {
    callback(err);
  });
};

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
