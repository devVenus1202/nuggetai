import {
  result,
  keywordResult,
  onSetFirstWord,
  onSetFirstKeyWord
} from '../FirstTypingEvent';

const expectation = [{ '0': 1000 }, { '0': 1000, '1': 1000 }, { '0': 1000 }];

describe('Event - FirstTypingEvent Test', () => {
  test('onSetFirstWord method should store time after when first word is written', () => {
    onSetFirstWord(0, 1000);
    expect(result).toEqual(expectation[0]);

    onSetFirstWord(1, 1000);
    expect(result).toEqual(expectation[1]);
  });

  test('onSetFirstKeyWord method should store time after when first Keyword is written', () => {
    onSetFirstKeyWord(0, 1000);
    expect(keywordResult).toEqual(expectation[2]);
  });
});
