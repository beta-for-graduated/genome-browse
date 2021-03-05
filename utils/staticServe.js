const express = require('express');


const log = require('./printLog');


/**
 * @description launch static server
 * @param {{name:string, location:string, port:number, allowOrigin:string}} option 
 */
function staticServe({name='static server', location, port, allowOrigin='*'}) {
  const app = express();
  
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

  app.listen(port, ()=>console.log(`# ${name} on ${location} is listening at ${port}`));
}


module.exports = staticServe
