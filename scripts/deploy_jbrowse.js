const fs = require('fs');
const process = require('process');
const child_exec = require('child_process')
const fileNames = fs.readdirSync('C:/Documents/Repos/genome-browse/data')

// this script can accept an argument as the root path of data service
const rootPath = process.argv[2] || 'http://localhost:8081';

// firstly add assembly, ensuring that track can be add successfully
fileNames.map(fileName => {
  if(fileName.endsWith('fa')){
    child_exec.execSync(
      `jbrowse add-assembly ${rootPath}/${fileName} -f`
    );
    console.log(`Assembly ${fileName} has been added`)
  }
})

fileNames.map(fileName => {
  if(fileName.endsWith('gff3.gz')){
    child_exec.execSync(
      `jbrowse add-track ${rootPath}/${fileName} -f`
    )
    console.log(`Track ${fileName} has been added`)
  }
})

// move config.json into 'jbrowse'
fs.copyFileSync('C:/Documents/Repos/genome-browse/config.json', 'C:/Documents/Repos/genome-browse/jbrowse/config.json');
fs.unlink('C:/Documents/Repos/genome-browse/config.json')