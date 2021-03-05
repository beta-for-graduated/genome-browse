require('../utils/loadLocalEnv')


const path = require('path')


const staticServe = require('../utils/staticServe');


staticServe({
  name: 'Data server',
  location: path.resolve(__dirname, '..', 'data'),
  port: Number(process.env.DATA_PORT),
  allowOrigin: '*',
})