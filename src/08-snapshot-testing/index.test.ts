import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList([1, 2]);
    expect(linkedList).toStrictEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: null,
          next: null,
        },
      },
    });
  });

  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([2, 3, 4, 5]);
    expect(linkedList).toMatchSnapshot();
  });
});
