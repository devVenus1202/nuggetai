import { advanceBy, advanceTo, clear } from 'jest-date-mock';
import {
  data,
  result,
  onFocusSection,
  onBlurSection,
  getResult
} from '../TimeSpentEvent';

describe('Event - TimeSpentEvent Test', () => {
  test('onFocusSection & onBlurSection method should store time spent on each section', () => {
    const expectation = { '0': '0.20', '1': '0.20', '2': '0.30' };

    advanceTo(0);
    onFocusSection(0, Date.now());

    advanceBy(100);
    onBlurSection(0, Date.now());
    onFocusSection(1, Date.now());

    advanceBy(200);
    onBlurSection(1, Date.now());
    onFocusSection(0, Date.now());

    advanceBy(100);
    onBlurSection(0, Date.now());
    onFocusSection(2, Date.now());

    advanceBy(300);
    getResult();

    expect(result).toEqual(expectation);
  });
});
