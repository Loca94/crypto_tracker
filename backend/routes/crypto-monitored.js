const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/list', async (req, res) => {
  await prisma.post
    .findMany({
      where: {
        userId: Number(),
      },
    })
    .then(crypto_monitored => {
      res.json(crypto_monitored);
    })
    .catch(err => {
      res.json(err);
    });

  res.send('Crypto-monitored');
});

module.exports = router;