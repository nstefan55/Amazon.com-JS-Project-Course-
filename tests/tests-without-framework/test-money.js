import { formatCurrency } from '../jscripts/utils/money.js';

// Examples of Test Cases

console.log('TEST SUITE: formatCurrency');

console.log('converts cents into dollars');
if (formatCurrency(2095) === '20.95') {
  console.log('PASSED');
} else {
  console.log('FAILED!');
}

console.log('works with number 0');
if (formatCurrency(0) === '0.00') {
  console.log('PASSED');
} else {
  console.log('FAILED!');
}

console.log('rounds to the nearest cent');
if (formatCurrency(2000.5) === '20.01') {
  console.log('PASSED');
} else {
  console.log('FAILED!');
}

console.log('rounds cents to smaller number');
if (formatCurrency(2000.4) === '20.00') {
  console.log('PASSED');
} else {
  console.log('FAILED!');
}
