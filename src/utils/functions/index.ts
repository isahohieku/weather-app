const getRandomCoordinate = (value: number): number => {
  const from = -180;
  const to = 180;
  return parseFloat((Math.random() * (to - from) + from).toFixed(value));
};

const roundNumber = (amount: number): number => Math.round(amount);

const fixToDecimalPlace = (value: number, fix = 2) => parseFloat(value.toFixed(fix));

export { getRandomCoordinate, roundNumber, fixToDecimalPlace };
