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


router.post('/signup', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(500).json({errorMessage: 'Passwords do not match'});
  } else {
    const emailAttribute = new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: 'email',
      Value: email
    });

    const usernameAttribute = new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: 'name',
      Value: username
    });

    userPool.signUp(email, password, [emailAttribute, usernameAttribute], null, async (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({errorMessage: err.message});
      } else {
        console.log(result);

        await prisma.user.create({
          data: {
            username: username,
            email: email
          }
        }).then(user => {
          res.status(200).json({message: 'User created'});
        }).catch(err => {
          console.log(err);
          res.status(500).json({errorMessage: err.message});
        });
      }
    });
  }
});

/**
 * La response conterrà un jwt token.
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
      await prisma.user.findUnique({
        where: { email: email },
        include: { monitoredCoins: true }
      }).then(user => {
        if (user) {
          res.json({
            message: 'User logged in',
            token: result.getIdToken().getJwtToken(),
            user
          });
        } else {
          res.status(500).json({errorMessage: 'User not found'});
        }
      }).catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: err.message});
      });
    },
    onFailure: (err) => {
      console.log(err);
      res.status(500).json({errorMessage: err.message});
    }
  });
});

router.post('/verify-account', async (req, res) => {
  const { email, verificationCode } = req.body;

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: email,
    Pool: userPool
  });

  cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({errorMessage: err.message});
    } else {
      console.log(result);
      res.status(200).json({message: 'User verified'});
    }
  });
});

module.exports = router;