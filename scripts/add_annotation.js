const gff_path = 'data/Avicennia_marina/A.gff3'
const anno_path = 'data/Avicennia_marina/A.anno'
const new_gff_path = 'data/A.anno.gff3'

const fs = require('fs');
const {readWriteFileByLineWithProcess} = require('../lib/readWriteByLine');


let anno_data = fs.readFileSync(anno_path,'utf8').trimEnd().split(/\t|\n/);

const annotations = new Map();

for(var i=0;i<anno_data.length;i+=2){
  annotations.set(anno_data[i], anno_data[i+1])
}

let lineNumber = 0;
readWriteFileByLineWithProcess(gff_path, new_gff_path, (line)=>{
  let seqName = line.split('Name=')[1]
  console.log(++lineNumber);
  if(seqName){
    return `${line};Annotation="${annotations.get(seqName)}"`
  }
  return line;
})

console.log('finished')