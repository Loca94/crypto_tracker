global.fetch = require('node-fetch');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const cognitoPoolCredentials = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.CLIENT_ID
}
const userPool = new AmazonCognitoIdentity.CognitoUserPool(cognitoPoolCredentials);


router.post('/register', (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.json({
      message: 'Passwords do not match'
    });
  } else {
    const emailData = {
      Name: 'email',
      Value: email
    };
    const emailAttribute = new AmazonCognitoIdentity.CognitoUserAttribute(emailData);

    userPool.signUp(email, password, [emailAttribute], null, async (err, result) => {
      if (err) {
        console.log(err);
        res.json({
          message: err.message
        });
      } else {
        console.log(result);

        // TODO: qui dobbiamo salvare l'utente nel database SQLite
        await prisma.user.create({
          data: {
            email: email,
            password: password
          }
        });

        res.json({
          message: 'User created'
        });
      }
    });
  }
});

/**
 * TODO: da verificare
 * La response conterra un jwt token.
 * La documentazione aws dice che 'You can use the tokens to grant your users access to your own server-side resources or to the Amazon API Gateway. Or you can exchange them for temporary AWS credentials to access other AWS services.'
 * Suppongo quindi di non doverci fare nulla, neppure salvarlo in una sessione/localStorage a frontend.
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: email,
    Password: password
  });

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: email,
    Pool: userPool
  });

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: async (result) => {
      console.log(result);
      // User logged in.
      // Now we have to retrieve it's data from the database and return it to the client.
      let user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

      console.log('The user from DB', {user});

      res.json({
        message: 'User logged in',
        token: result.getIdToken().getJwtToken(),
        user
      });
    },
    onFailure: (err) => {
      console.log(err);
      res.json({
        message: err.message
      });
    }
  });
});

module.exports = router;