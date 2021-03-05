require('../utils/loadLocalEnv')


const path = require('path')


const staticServe = require('../utils/staticServe');


staticServe({
  name: 'Jbrowse server',
  location: path.resolve(__dirname, '..', 'jbrowse'),
  port: process.env.JBROWSE_PORT,
  allowOrigin: '*'
})