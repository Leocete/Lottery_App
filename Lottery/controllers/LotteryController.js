const numeral = require('numeral');
const ApiResponse = require('../utils/response');
const InputValidation = require('../utils/validation');
const numbersCounter = require('../src/numbersCounter');

const LotteryController = {
  simulate: (req, res) => {
    const { numbers, draws } = req.body;

    InputValidation.lotterySimulate(numbers, draws);

    let wonMoney = 0;
    const winNumArray = [0, 0, 0, 0, 0, 0, 0];

    for (let i = 1; i <= draws; i += 1) {
      // Generating a random array of 6 numbers
      let winArray = new Set();
      while (winArray.size < 6) winArray.add(Math.floor(Math.random() * 53));
      winArray = Array.from(winArray);

      const drawResults = numbersCounter(numbers, winArray);
      wonMoney += drawResults.userMoney;
      winNumArray[drawResults.counter] += 1;
    }

    const responseObject = {
      input: {
        numbers,
        draws,
      },
      results: {
        spent: numeral(5 * draws).format('$0,0.00'),
        won: numeral(wonMoney).format('$0,0.00'),
        matches: winNumArray,
      },
    };

    ApiResponse.success(res, responseObject);
  },
};

module.exports = LotteryController;
