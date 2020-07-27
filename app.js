const express = require('express');
const app = express();
const configs = require('./config/index');
const moviesRoutes = require('./routes/movies');

app.use(express.json());
//Use routes movies
app.use('/api/movies', moviesRoutes);



//Server port
app.listen(configs.port, () => {
  console.log(`Listening http://localhost:${configs.port}`);
});
