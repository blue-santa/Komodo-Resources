const fs = require('fs-extra');
const path = require('path');
const chprc = require('child_process');
const prompt = require('prompt');
const rimraf = require('rimraf');

const base = path.join(__dirname + '/KomodoPlatformdocs/docs/source');
const dest = path.join(__dirname + '/SidRebuild/docs');
const rstFileType = '.rst';

if (fs.existsSync(dest)) {
  console.log(`The last transfer attempt is still present. Attempting to delete.`);
  rimraf(dest, ['rmdir'], (err) => {
    if (!err) {
      return console.log(`rimraf successfully deleted ${dest}`);
    }
    console.error(err);
  });
  setTimeout(() => {
      if (!fs.existsSync(dest)) {
      console.log(`recreating ${dest}`);
      fs.mkdirSync(dest);
    } else {
      return console.error(`rimraf didn't delete`);
    }
  }, 1000);
}

setTimeout(() => {
    fs.copy(base, dest)
  .then(() => console.log(`directory successfully transferred`))
  .then(() => {
    transferRstToHtmlRecursive(dest);
  })
  .catch((err) => {
    console.log(`there was an error in fs.copy()`);
    console.error(err);
});
}, 1000);

/*
convert all files to html
*/

var transferRstToHtmlRecursive = function(pathRecursive) {
  console.log(`current path is: ${pathRecursive}`);
  setTimeout(() => {
    if (fs.existsSync(pathRecursive)) {
      fs.readdirSync(pathRecursive).forEach(function(file, index){
        let curPath = path.join(pathRecursive + "/" + file);
        if (fs.lstatSync(curPath).isDirectory()) {
          transferRstToHtmlRecursive(curPath);
        } else if (file.includes('.rst')) {
          let fileHtml = file.slice(0, -4);
          fileHtml = fileHtml + '.html';
          let futPath = path.join(pathRecursive + '/' + fileHtml);
          /* transform file */
          console.log(`about to transform file, ${file}, to ${fileHtml}`);
          setTimeout(() => {
            let workerProcess = chprc.exec(`pandoc ${curPath} -f rst -t html -o ${futPath}`, (err, stdout, stderr) => {
              if (err) { console.error(err) };
            });
            workerProcess.on('exit', (code) => {
              if (!futPath) {
                console.log(`the file, ${file}, didn't transfer`)
              } else {
                console.log(`the file, ${file}, was successfully transferred to html with code: ${code}`);
                setTimeout(() => {
                  console.log(`about to delete file: ${file}`);
                  fs.unlinkSync(curPath);
                }, 1000);
              }
            });
          }, 3000*Math.random());
        }
      });
    }
  }, 5500*Math.random());
};
