const PORT = 8080;

const express = require('express');

const app = express();

app.use(express.static('./jbrowse'));

app.listen(PORT, ()=>console.log(`listening on ${PORT} ...`));

