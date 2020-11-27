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
  child_exec.execSync(
    `(grep ^"#" ${DATA_FILE}; grep -v ^"#" ${DATA_FILE} | sort -k1,1 -k4,4n) > ${DATA_NAME}.sorted.gff3`);
  child_exec.execSync(
    `bgzip ${DATA_NAME}.sorted.gff3`
  );
  child_exec.execSync(
    `tabix -p gff ${DATA_NAME}.sorted.gff3.gz`
  );
}


