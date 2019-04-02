const express = require('express');
// const cors = require('cors');
const LotteryController = require('../controllers/LotteryController');

const router = express.Router();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

router.post('/simulate', /* , cors() */ LotteryController.simulate);

// router.use(cors());


router.all('*', (req, res, next) => {
  const err = new Error('message: Endpoint not found');
  err.status = 404;
  next(err);
});

module.exports = router;
