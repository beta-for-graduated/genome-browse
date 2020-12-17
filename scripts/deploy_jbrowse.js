const fs = require('fs'),
process = require('process'),
child_exec = require('child_process'),
path = require('path'),
ip = require('../utils/getIP')(),
manifest = require('../manifest.json');
const port = manifest.data.port;

const ROOT_PATH = process.cwd();

// Accept baseURL, localPath of genome data cmd arguments
const DATA_BASE_URL = process.argv[2] || `http://${ip}:${port}`;
const DATA_LOCAL_PATH = process.argv[3] || path.join(ROOT_PATH, 'data');

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
      (fileName, assemblyName)=>new RegExp(`^${assemblyName}\.fa[^\.^i]*$`).test(fileName), 
      addAssembly
    ),
    generateDeployer(
      (fileName, assemblyName)=>/\.fa[^\.^i]*$/.test(fileName) && !fileName.startsWith(assemblyName),
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


// Move config.json to jbrowse folder
deployAllData();
const originPath = path.join(ROOT_PATH, 'config.json');
const goalPath = path.join(ROOT_PATH, 'jbrowse/config.json');
fs.copyFileSync(originPath, goalPath);
fs.unlinkSync(originPath);