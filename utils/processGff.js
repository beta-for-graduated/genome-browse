const child_exec = require('child_process');

module.exports = function (fileName) {
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
}