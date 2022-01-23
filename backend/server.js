global.fetch = require('node-fetch');
require('dotenv').config();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const expressValidator = require('express-validator');
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(express.static(process.cwd() + '../frontend/dist/frontend'));

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const cognitoPoolCredentials = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.CLIENT_ID
}
const userPool = new AmazonCognitoIdentity.CognitoUserPool(cognitoPoolCredentials);


app.get('/', (req, res) => {
  res.send('App works!!!');
});

app.post('/signup', (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    // TODO: controllare che esca effettivamente dalla chiamata API senza dover mettere un else nel codice
    res.json({
      message: 'Passwords do not match'
    });
  } else {
    const emailData = {
      Name: 'email',
      Value: email
    };
    const emailAttribute = new AmazonCognitoIdentity.CognitoUserAttribute(emailData);

    userPool.signUp(email, password, [emailAttribute], null, (err, result) => {
      if (err) {
        console.log(err);
        res.json({
          message: err.message
        });
      } else {
        console.log(result);

        // TODO: qui dobbiamo salvare l'utente nel database

        res.json({
          message: 'User created'
        });
      }
    });
  }
});

app.post('')

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});