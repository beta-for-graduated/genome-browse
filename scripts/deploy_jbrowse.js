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
    `jbrowse add-assembly ${fileUrl} -n ${assemblyName} -f`
  );
  console.log(`Assembly ${fileUrl} has been added`)
}

function addFastaTrack (fileUrl, assemblyName) {
  child_exec.execSync(
    `jbrowse add-track ${fileUrl} -t AlignmentsTrack -a ${assemblyName} -f`
  )
  console.log(`Track ${fileUrl} has been added`)
}

function addGffTrack (fileUrl, assemblyName) {
  child_exec.execSync(
    `jbrowse add-track ${fileUrl} -t AlignmentsTrack -a ${assemblyName} -f`
  )
  console.log(`Track ${fileUrl} has been added`)
}


// Deploy genome data into config.json
/**
 * @param {(fileName:string, assemblyName:string)=>boolean} validater 
 * @param {(fileUrl:string, assemblyName:string)=>void} adder
 * @returns {(assemblyName:string)=>string} 
 */
function generateDeployer (validater, adder) {
  return function (assemblyName) {
    getFileNames(assemblyName)
      .filter(fileName => validater(fileName, assemblyName))
      .map(fileName => adder(getFileUrl(assemblyName,fileName), assemblyName));
    return assemblyName;
  }
}

function deployAllData () {
  const deployerGroup = [
    generateDeployer(
      (fileName, assemblyName)=>new RegExp(`^${assemblyName}\.fa$`).test(fileName), 
      addAssembly
    ),
    generateDeployer(
      (fileName, assemblyName)=>/\.fa$/.test(fileName) && !fileName.startsWith(assemblyName),
      addFastaTrack
    ),
    generateDeployer(
      fileName => /\.gff3?\.gz$/.test(fileName),
      addGffTrack
    )
  ]
  getAssemblyNames()
  .map(assemblyName => {
    // Assembly must be added before tracks
    deployerGroup.forEach(deployer => deployer(assemblyName));
  })
}


// Generate config.json and move to 'jbrowse'
deployAllData();
fs.copyFileSync('C:/Documents/Repos/genome-browse/config.json', 'C:/Documents/Repos/genome-browse/jbrowse/config.json');
fs.unlinkSync('C:/Documents/Repos/genome-browse/config.json');