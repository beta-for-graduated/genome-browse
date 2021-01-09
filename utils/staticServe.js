module.exports = function({name, location, port, allowOrigin}) {
  const express = require('express');
  const app = express();
  const log = require('./printLog');
  
  app.use(log);
  app.use((req, res, next)=>{
    res.set({
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Max-Age': '86400'
    });
    if(req.method==='OPTIONS') res.sendStatus(200)
    next();
  })
  app.use(express.static(location));
  
  
  app.listen(port, ()=>console.log(`# ${name} on ${port}`));
}