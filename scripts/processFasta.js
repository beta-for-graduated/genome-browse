const child_exec = require('child_process');
const process = require('process');

const fileName = process.argv[2];

function generateFai (fileName) {
  child_exec.execSync(`samtools faidx ${fileName}`);
}

generateFai(fileName);

module.exports = generateFai;