const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/get-all/:userId', async (req, res) => {
  const userId = res.params.userId;

  prisma.post
    .findMany({
      where: {
        userId: Number(userId),
      },
    })
    .then(coinsInWatchlist => {
      res.json(coinsInWatchlist);
    })
    .catch(err => {
      res.json(err);
    });
});


router.post('/add', async (req, res) => {
  const { userId, coinMonitored } = req.body;

  await prisma.coinMonitored.create({
    data: {
      coinId: coinMonitored.coinId,
      name: coinMonitored.name,
      symbol: coinMonitored.symbol,
      alias: coinMonitored.alias,
      targetPrice: coinMonitored.targetPrice,
      userId: Number(userId),
      tags: {
        create: coinMonitored.tags.map(tag => {
          return {
            name: tag.name,
          };
        }),
      }
    },
  })
  .then(coinMonitored => {
    // TODO: this coin returned to fronted must be added to the view
    res.json(coinMonitored);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: "Internal server error"});
  });
});


router.post('/delete', async (req, res) => {
  const { coinId } = req.body;

  try {
    // Delete from table CoinMonitored
    await prisma.coinMonitored
      .delete({
        where: {
          id: coinId,
        },
      });

    // Delete from table TagsOfCoinMonitored
    await prisma.tagsOfCoinMonitored
      .deleteMany({
        where: {
          cryptoId: coinId,
        },
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({error: "Internal server error"});
  }

  res.json({ ok: true });
});

module.exports = router;