const process = require('process');
const child_exec = require('child_process');

const DATA_FILE = process.argv[2];
const DATA_NAME = DATA_FILE.match(/[^\.]+/)[0];

if (DATA_FILE.endsWith('gff') || DATA_FILE.endsWith('gff3')){
  console.log(DATA_FILE)
  preprocessGff();
}else if(DATA_FILE.endsWith('fa')){
  preprocessFasta();
}

function preprocessFasta () {
  child_exec.execSync(
    `samtools faidx ${DATA_FILE}`
  )
}

function preprocessGff () {
  // delete blank lines
  child_exec.execSync(
    `sed '/^$/d' ${DATA_FILE} > ${DATA_NAME}.clean.gff3`
  )
  // sort
  child_exec.execSync(
    `(grep ^"#" ${DATA_NAME}.clean.gff3; grep -v ^"#" ${DATA_NAME}.clean.gff3 | sort -k1,1 -k4,4n) > ${DATA_NAME}.sorted.gff3`
  );
  child_exec.execSync(
    `bgzip ${DATA_NAME}.sorted.gff3`
  );
  child_exec.execSync(
    `tabix -p gff ${DATA_NAME}.sorted.gff3.gz`
  );
}


