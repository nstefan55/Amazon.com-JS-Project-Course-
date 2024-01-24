import { formatCurrency } from '../jscripts/utils/money.js';

// creating the test suite
describe('Test Suite: formatCurrency', () => {
  it('Converts cents into dollars', () => {
    //test name

    expect(formatCurrency(2095)).toEqual('20.95'); //checks if the value on the left is equal to the right
  });

  it('Works with the number 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  describe('Rounding', () => {
    it('Rounds to the nearest cent', () => {
      expect(formatCurrency(2000.5)).toEqual('20.01');
    });

    it('Rounds to the smaller cent', () => {
      expect(formatCurrency(2000.4)).toEqual('20.00');
    });
  });
});
