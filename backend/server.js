require('dotenv').config();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());
app.use(express.static(process.cwd() + '../frontend/dist/frontend'));

app.use('/', require('./routes/index'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/crypto-monitored', require('./routes/crypto-monitored'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});