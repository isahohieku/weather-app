const getRandomCoordinate = (fixed: number): number => {
  const from = -180;
  const to = 180;
  return parseFloat((Math.random() * (to - from) + from).toFixed(fixed));
};

export { getRandomCoordinate };
