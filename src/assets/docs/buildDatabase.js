const fs = require('fs-extra');
const path = require('path');
const chprc = require('child_process');
const prompt = require('prompt');

const sequelize = require('../../db/models/index').sequelize;
const PrimaryTopic = require('../../db/models').PrimaryTopic;
const SecondaryTopic = require('../../db/models').SecondaryTopic;

const base = path.join(__dirname + '/SidRebuild/docs');

/* Starting next */

const projectIndex = dest + '/index.html';

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
