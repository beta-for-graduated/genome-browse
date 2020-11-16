// provide Data, Jbrowse service

const express = require('express');
const manifest = require('./manifest.json');

for(let serverName in manifest){
  let serverConfig = manifest[serverName];
  let app = express();

  if(serverName==='data'){
    app.use((req, res, next)=>{
      res.set({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        // 'range' header is carried by complex requests (especially FASTA file)
        'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type, range',
        'Access-Control-Max-Age': '86400'
      });
      // express.static() cannot handle preflighted requests correctly
      if(req.method==='OPTIONS') res.sendStatus(200)
      next();
    })
  }
  
  app.use(express.static(serverConfig.location));
  app.listen(serverConfig.port);
}
