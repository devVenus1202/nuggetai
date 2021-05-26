import { result, addWordCount } from '../SectionWordsEvent';

describe("Event - SectionWordsEvent Test", () => {
  test('addWordCount method should add section content', () => {
    const testInput = {
      sectionId: 'problem',
      text: "React is very popular frontend framework and it reacts to component's status",
    };
    
    const expectation = {"problem": 12};

    addWordCount(testInput.sectionId, testInput.text);
    expect(result).toEqual(expectation);
  });
});