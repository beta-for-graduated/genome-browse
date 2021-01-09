const staticServe = require('../utils/staticServe');
const {data} = require('../manifest.json');
const {location, port} = data;

staticServe({
  location,
  port,
  name: 'Data server',
  allowOrigin: '*',
})