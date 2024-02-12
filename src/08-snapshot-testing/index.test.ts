import { generateLinkedList } from './index';

const array = [3, 4, 5, 6];
const expected = {
  value: 3,
  next: {
    value: 4,
    next: {
      value: 5,
      next: {
        value: 6,
        next: {
          value: null,
          next: null,
        },
      },
    },
  },
};

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList(array);
    expect(linkedList).toStrictEqual(expected);
  });

  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList(array);
    expect(linkedList).toMatchSnapshot();
  });
});
