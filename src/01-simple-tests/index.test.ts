import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 3, b: 5, action: Action.Add };
    const result = simpleCalculator(input);
    expect(result).toEqual(8);
  });

  test('should subtract two numbers', () => {
    const input = { a: 10, b: 5, action: Action.Subtract };
    const result = simpleCalculator(input);
    expect(result).toEqual(5);
  });

  test('should multiply two numbers', () => {
    const input = { a: 4, b: 3, action: Action.Multiply };
    const result = simpleCalculator(input);
    expect(result).toEqual(12);
  });

  test('should divide two numbers', () => {
    const input = { a: 10, b: 2, action: Action.Divide };
    const result = simpleCalculator(input);
    expect(result).toEqual(5);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Exponentiate };
    const result = simpleCalculator(input);
    expect(result).toEqual(8);
  });

  test('should return null for invalid action', () => {
    const input = { a: 3, b: 5, action: 'InvalidAction' };
    const result = simpleCalculator(input);
    expect(result).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    const input = { a: '3', b: '5', action: Action.Add };
    const result = simpleCalculator(input);
    expect(result).toEqual(null);
  });
});
