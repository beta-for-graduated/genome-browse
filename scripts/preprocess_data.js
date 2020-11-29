const process = require('process');
const fs = require('fs');
const path = require('path');
const processFasta = require('../utils/processFasta');
const processGff = require('../utils/processGff');

const DATA_DIR = process.argv[2] || path.join(process.cwd(), 'data');
const processorGroup = [preprocessFasta, preprocessGff];

function preprocessFasta (fileName) {
  if(/\.fa(s(t(a?)?)?)$/.test(fileName)){
    fs.renameSync(fileName, fileName.replace(/\.[^\.]+$/, '.fa'));
    processFasta(fileName);
    console.log(`FASTA: ${fileName} process finished`);
  }
}

function preprocessGff (fileName) {
  if(/\.gff3?+$/.test(fileName)){
    processGff(fileName);
    console.log(`GFF: ${fileName} process finished`);
  }

}

fs.readdirSync(DATA_DIR).forEach(assemblyName => {
  let assemblyDir = path.join(DATA_DIR, assemblyName);
  process.chdir(assemblyDir);
  console.log(`Assembly ${assemblyDir} started.`);
  fs.readdirSync(assemblyDir).forEach(fileName => {
    processorGroup.forEach(processor => processor(fileName));
  });
  console.log(`Assembly ${assemblyDir} finished.\n`);
})

