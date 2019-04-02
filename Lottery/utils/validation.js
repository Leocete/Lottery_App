const InputValidation = {

  lotterySimulate: (numbers, draws) => {
    if (!numbers || !numbers.length || numbers.length !== 6 || !numbers.every(element => typeof element === 'number')) {
      const err = new Error('Please, enter a valid array of numbers');
      err.status = 422;
      throw err;
    }

    if (Number.isNaN(parseInt(draws, 10)) || draws < 0 || draws > 100000) {
      const err = new Error('Please, enter a valid array of draws');
      err.status = 422;
      throw err;
    }
  },

};
module.exports = InputValidation;
