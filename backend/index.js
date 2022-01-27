const http = require('http');
const path = require('path');
const express = require('express');
const router = require('./router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', router) ;

http.createServer(app).listen(process.env.PORT || 3000, () => {
  console.log('Express server listening on port ' + (process.env.PORT || 3000));
});