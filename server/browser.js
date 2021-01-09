require('../utils/loadLocalEnv')

const {jbrowse} = require('../manifest.json');
const {location, port} = jbrowse;
const allowOrigin = `http://${process.env.DOMAIN}:${process.env.PORT}`
const staticServe = require('../utils/staticServe');

staticServe({
  location,
  port,
  allowOrigin,
  name: 'Jbrowse server'
})