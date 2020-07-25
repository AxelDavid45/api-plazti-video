const express = require('express');
const app = express();
const configs =require('./config/index');

//Challenge, create a server that recives a year and determine whether
//is bisiesto or not

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/json', (req, res) => {
  res.json({hello: 'world'});
})

app.listen(configs.port, () =>{
  console.log(`Listening http://localhost:${configs.port}`);
});
