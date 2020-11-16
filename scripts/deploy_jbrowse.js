const fs = require('fs');
const child_exec = require('child_process')
const fileNames = fs.readdirSync('C:/Documents/Repos/genome-browse/data')

// firstly add-assembly
fileNames.map(fileName => {
  if(fileName.endsWith('fa')){
    child_exec.execSync(
      `jbrowse add-assembly http://localhost:8081/${fileName} -f`
    );
    console.log(`Assembly ${fileName} has been added`)
  }
})

// secondly add-track
fileNames.map(fileName => {
  if(fileName.endsWith('gff3.gz')){
    child_exec.execSync(
      `jbrowse add-track http://localhost:8081/${fileName} -f`
    )
    console.log(`Track ${fileName} has been added`)
  }
})

// move config.json into 'jbrowse'
fs.copyFileSync('C:/Documents/Repos/genome-browse/config.json', 'C:/Documents/Repos/genome-browse/jbrowse/config.json');
fs.unlink('C:/Documents/Repos/genome-browse/config.json')