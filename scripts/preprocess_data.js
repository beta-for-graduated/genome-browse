const process = require('process');
const fs = require('fs');
const path = require('path');
const child_exec = require('child_process');

// const child_exec = {
//   execSync () {}
// }

const DATA_DIR = process.argv[2] || path.join(process.cwd(), 'data');
const processorGroup = [preprocessFasta, preprocessGff];

function preprocessFasta (fileName) {
  if(/\.f[^\.]+$/.test(fileName)){
    child_exec.execSync(
      `samtools faidx ${fileName}`
    );
    console.log(`FASTA: ${fileName} process finished`);
  }
}

function preprocessGff (fileName) {
  if(/\.gff[^\.]+$/.test(fileName)){
    const dataName = fileName.match(/[^\.]+/)[0];
    // delete blank lines
    child_exec.execSync(
      `sed '/^$/d' ${fileName} > ${dataName}.clean.gff3`
    )
    // sort
    child_exec.execSync(
      `(grep ^"#" ${dataName}.clean.gff3; grep -v ^"#" ${dataName}.clean.gff3 | sort -k1,1 -k4,4n) > ${dataName}.sorted.gff3`
    );
    child_exec.execSync(
      `bgzip ${dataName}.sorted.gff3`
    );
    child_exec.execSync(
      `tabix -p gff ${dataName}.sorted.gff3.gz`
    );
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

