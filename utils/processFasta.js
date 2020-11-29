const child_exec = require('child_process');

module.exports = function (fileName) {
  child_exec.execSync(`samtools faidx ${fileName}`);
}