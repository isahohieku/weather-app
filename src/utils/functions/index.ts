import type { ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

const getRandomCoordinate = (from: number, to: number, fixed: number): number => {
  return parseFloat((Math.random() * (to - from) + from).toFixed(fixed));
};

const waitForComponentToPaint = async <P>(wrapper: ReactWrapper<P>, amount = 0) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, amount));
    wrapper.update();
  });
};

export { getRandomCoordinate, waitForComponentToPaint };
