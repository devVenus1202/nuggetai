import { transition, onFocusSection } from '../TransitionEvent';

describe("Event - TransitionEvent Test", () => {
  test('onFocusSection method should calculate transition count on each section', () => {
    const testInput = [0, 1, 2, 1, 0, 1, 0, 1, 2, 3, 0, 1, 0, 1, 0];

    const expectation = {"0": 6, "1": 6, "2": 2, "3": 1};
    
    testInput.map(val => {
      onFocusSection(val);
    });

    expect(transition).toEqual(expectation);
  });

});