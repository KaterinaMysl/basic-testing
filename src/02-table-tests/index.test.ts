// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 0, action: Action.Add, expected: 3 },
  { a: -6, b: 2, action: Action.Add, expected: -4 },
  { a: 5, b: '2', action: Action.Add, expected: null },
  { a: '5', b: 2, action: Action.Add, expected: null },
  { a: null, b: 3, action: Action.Add, expected: null },
  { a: 4, b: undefined, action: Action.Add, expected: null },
  { a: true, b: 1, action: Action.Add, expected: null },
  { a: 4, b: 1, action: Action.Subtract, expected: 3 },
  { a: -1, b: -5, action: Action.Subtract, expected: 4 },
  { a: -5, b: 12, action: Action.Subtract, expected: -17 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: -5, b: 1, action: Action.Multiply, expected: -5 },
  { a: 8, b: 0, action: Action.Multiply, expected: 0 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: 6, b: 6, action: Action.Divide, expected: 1 },
  { a: -12, b: 2, action: Action.Divide, expected: -6 },
  { a: 0, b: 2, action: Action.Divide, expected: 0 },
  { a: 2, b: 1, action: Action.Exponentiate, expected: 2 },
  { a: 6, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },
  { a: null, b: 1, action: Action.Exponentiate, expected: null },
  { a: 5, b: 2, action: 'newAction', expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ a, b, action, expected }) => {
    test(`should return ${expected} for ${action} operation with ${a} and ${b}`, () => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    });
  });
});
