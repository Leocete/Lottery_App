// Counting the number of winning numbers in the ticket, adding that number to the array
const numbersCounter = (userArr, winArr) => {
  let counter = 0;
  const winnings = [0, 0, 10, 28, 775, 55000, 25000000];

  for (let i = 0; i < userArr.length; i += 1) {
    if (winArr.includes(userArr[i])) {
      counter += 1;
    }
  }
  return {
    userMoney: winnings[counter],
    counter,
  };
};

module.exports = numbersCounter;
