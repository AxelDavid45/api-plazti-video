const express = require('express');
const app = express();
const configs = require('./config/index');
const moviesRoutes = require('./routes/movies');
const errorsMiddleware = require('./utils/middleware/error-handling');

//Parses incoming request with json payload
app.use(express.json());
//Use routes movies
app.use('/api/movies', moviesRoutes);
//Error handling
app.use(errorsMiddleware.logErrors);
app.use(errorsMiddleware.errorHandler);


//Server port
app.listen(configs.port, () => {
  console.log(`Listening http://localhost:${configs.port}`);
});
