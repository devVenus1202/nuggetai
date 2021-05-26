import { onDropped, result } from '../DragEvent';

const expectation = [
  { dragCount: 1, wordCount: 12 },
  { dragCount: 2, wordCount: 17 }
];

describe.skip('Event - DragEvent Test', () => {
  test('onDropped method should calculate dragged text count & word count ', () => {
    onDropped('If you feel that the React documentation goes at a faster pace');
    expect(result).toEqual(expectation[0]);

    onDropped('If you feel that the');
    expect(result).toEqual(expectation[1]);
  });
});
