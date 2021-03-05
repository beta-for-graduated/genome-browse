/**
 * @description generate config.json for jbrowse
*/


require('../utils/loadLocalEnv')


const fs = require('fs'),
child_exec = require('child_process'),
path = require('path');


const ROOT_PATH = path.resolve(__dirname, '..'),
DATA_DIR = path.join(ROOT_PATH, 'data'),
ORIGINAL_CONFIG_PATH = path.join(ROOT_PATH, 'config.json'),
TARGET_CONFIG_PATH =  path.join(ROOT_PATH, 'jbrowse','config.json');


const BASE_URL = `http://${process.env.DOMAIN}:${process.env.DATA_PORT}`;


function getAssemblyNames () {
  return fs.readdirSync(DATA_DIR);
}

function getFileNames (dirName) {
  return fs.readdirSync(`${DATA_DIR}/${dirName}`);
}

function getFileUrl (dirName, fileName) {
  return `${BASE_URL}/${dirName}/${fileName}`;
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
    `jbrowse add-track ${fileUrl} -t FeatureTrack -a ${assemblyName} -f`
  )
  console.log(`Track ${fileUrl} has been added`)
}

function addGffTrack (fileUrl, assemblyName) {
  child_exec.execSync(
    `jbrowse add-track ${fileUrl} -a ${assemblyName} -f`
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
fs.copyFileSync(ORIGINAL_CONFIG_PATH, TARGET_CONFIG_PATH);
fs.unlinkSync(ORIGINAL_CONFIG_PATH);