import { data, addSectionData } from '../SectionDataEvent';

describe("Event - SectionDataEvent Test", () => {
  test('addSectionData method should add section content', () => {
    const testInput = {
      sectionId: 'problem',
      text: "React is very popular frontend framework and it reacts to component's status",
      index: 1
    };
    
    const expectation = {
      "problem": {
        "section": 1, 
        "text": "React is very popular frontend framework and it reacts to component's status"
      }
    };

    addSectionData(testInput.sectionId, testInput.text, testInput.index);
    expect(data).toEqual(expectation);
  });
});