const fs = require('fs');
const process = require('process');
const child_exec = require('child_process');

// Accept baseURL, localPath of genome data cmd arguments
const DATA_BASE_URL = process.argv[2] || 'http://localhost:8081';
const DATA_LOCAL_PATH = process.argv[3] || "C:/Documents/Repos/genome-browse/data";

function getAssemblyNames () {
  return fs.readdirSync(DATA_LOCAL_PATH);
}

function getFileNames (dirName) {
  return fs.readdirSync(`${DATA_LOCAL_PATH}/${dirName}`);
}

function getFileUrl (dirName, fileName) {
  return `${DATA_BASE_URL}/${dirName}/${fileName}`;
}


// Use jbrowse-cli to add assembly and track
function addAssembly (fileUrl, assemblyName) {
  child_exec.execSync(
    `jbrowse add-assembly ${fileUrl} -f`
  );
  console.log(`Assembly ${fileUrl} has been added`)
}

function addFastaTrack (fileUrl, assemblyName) {
  // TODO add .fa track
}

function addGffTrack (fileUrl, assemblyName) {
  child_exec.execSync(
    `jbrowse add-track ${fileUrl} -t AlignmentsTrack -a ${assemblyName} -f`
  )
  console.log(`Track ${fileUrl} has been added`)
}


// Deploy genome data into config.json
function generateDeployer (extName, deployer) {
  return function (assemblyName) {
    getFileNames(assemblyName)
    .filter(fileName => fileName.endsWith(extName))
    .map(fileName => deployer(getFileUrl(assemblyName,fileName), assemblyName));
  }
}

function deployAllData () {
  // Assembly must be added before tracks
  const deployers = [
    generateDeployer('fa', addAssembly),
    generateDeployer('gff3.gz', addGffTrack)
  ];
  getAssemblyNames()
  .map(assemblyName => {
    deployers.forEach(deploy => deploy(assemblyName));
  })
}


// Generate config.json and move to 'jbrowse'
deployAllData();
fs.copyFileSync('C:/Documents/Repos/genome-browse/config.json', 'C:/Documents/Repos/genome-browse/jbrowse/config.json');
fs.unlinkSync('C:/Documents/Repos/genome-browse/config.json');