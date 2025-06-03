const chokidar = require('chokidar');
const path = require('path');
const {exec} = require('child_process');

const animationsDir = path.resolve(__dirname, '../src/animations');
const buildScript = path.resolve(__dirname, 'build-animation-index.js');

// Watch .css files in the animations folder
chokidar
  .watch(`${animationsDir}/*.css`, {ignoreInitial: true})
  .on('add', runBuild)
  .on('unlink', runBuild)
  .on('change', runBuild);

function runBuild() {
  exec(`node ${buildScript}`, (err, stdout, stderr) => {
    if (err) return console.error(`❌ Error: ${stderr}`);
    console.log(stdout);
  });
}
