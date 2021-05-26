import {
  total,
  result,
  addKeywordCount,
} from '../KeywordEvent';

const expectation = [
  { result: {"react": 1}, total: 1 },
  { result: {"react": 2}, total: 2 }
];

describe("Event - KeywordEvent Test", () => {
  test('addKeywordCount method should store time after when first word is written', () => {
    const testInput = {
      keyword: 'react',
      text: "React is very popular frontend framework and it reacts to component's status"
    };
    
    addKeywordCount(testInput.keyword, testInput.text);
    expect(result).toEqual(expectation[0].result);
    expect(total).toEqual(expectation[0].total);

    addKeywordCount(testInput.keyword, testInput.text);
    expect(result).toEqual(expectation[1].result);
    expect(total).toEqual(expectation[1].total);
  });
});
