const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/get-all/:userId', async (req, res) => {
  const userId = req.params.userId;

  prisma.coinMonitored.findMany({
    where: {
      userId: Number(userId),
    },
    include: { tags: true },
  })
  .then(coinsInWatchlist => {
    res.json(coinsInWatchlist);
  })
  .catch(err => {
    res.json(err);
  });
});


router.get('/get-one/:userId/:coinId', async (req, res) => {
  const { coinId, userId } = req.params;

  prisma.coinMonitored.findFirst({
    where: {
      coinId: coinId,
      userId: Number(userId),
    },
    include: { tags: true },
  })
  .then(coinInWatchlist => {
    res.json(coinInWatchlist);
  })
  .catch(err => {
    res.status(404).json(err);
  });
});

router.post('/add', async (req, res) => {
  const { userId, coin } = req.body;

  await prisma.coinMonitored.create({
    data: {
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      alias: coin.alias,
      targetPrice: coin.targetPrice,
      user: {
        connect: {
          id: Number(userId)
        }
      },
      tags: {
        connectOrCreate: coin.tags.map(tag => {
          return {
            create: {
              name: tag.toLowerCase(),
            },
            where: {
              name: tag.toLowerCase(),
            },
          };
        }),
      }
    },
  })
  .then(coinMonitored => {
    // Returns the instance just created
    res.json(coinMonitored);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: "Internal server error"});
  });
});


router.post('/remove', async (req, res) => {
  const { coinId } = req.body;

  try {
    // Delete from table CoinMonitored
    await prisma.coinMonitored
      .delete({
        where: {
          id: coinId,
        },
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({error: "Internal server error"});
  }

  res.json({ ok: true });
});

module.exports = router;