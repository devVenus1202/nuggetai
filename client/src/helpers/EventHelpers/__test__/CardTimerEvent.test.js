import { advanceBy, advanceTo, clear } from 'jest-date-mock';
import { onFocusAccordion, result, getResult, init } from '../CardTimerEvent';

const expectation = [
  { '0': { startedAt: 1530075600000 } },
  { '0': { duration: 3000 }, '1': { startedAt: 1530075603000 } },
  {
    '0': { duration: 3000 },
    '1': { duration: 6000 },
    '2': { startedAt: 1530075609000 }
  },
  {
    '0': { duration: 3000, startedAt: 1530075612000 },
    '1': { duration: 6000 },
    '2': { duration: 3000 }
  },
  { '0': '6.00', '1': '6.00', '2': '3.00' },
  { '0': { startedAt: 1530075615000 } },
  { '0': { duration: 3000 }, '3': { startedAt: 1530075618000 } }
];

describe('Event - CardTimerEvent Test', () => {
  test('onFocusAccordion method should store time spent on Accordion ', () => {
    advanceTo(new Date(1530075600000)); // 2018, 5, 27, 0, 0, 0
    onFocusAccordion(0);
    expect(result).toEqual(expectation[0]);

    // 3000ms spent on First Accordion and focused to Second
    advanceBy(3000);
    onFocusAccordion(1);
    expect(result).toEqual(expectation[1]);

    // 3000ms spent on Second Accordion
    advanceBy(3000);
    onFocusAccordion(1);
    expect(result).toEqual(expectation[1]);

    // 6000ms spent on Second Accordion and focused to Third
    advanceBy(3000);
    onFocusAccordion(2);
    expect(result).toEqual(expectation[2]);

    // 3000ms spent on Third Accordion and focused to First & 3000ms spent on First
    advanceBy(3000);
    onFocusAccordion(0);
    expect(result).toEqual(expectation[3]);

    init();

    clear();
  });

  test('getResult method should get the final result so far ', () => {
    advanceTo(new Date(1530075600000)); // 2018, 5, 27, 0, 0, 0
    onFocusAccordion(0);
    expect(result).toEqual(expectation[0]);

    // 3000ms spent on First Accordion and focused to Second
    advanceBy(3000);
    onFocusAccordion(1);
    expect(result).toEqual(expectation[1]);

    // 3000ms spent on Second Accordion
    advanceBy(3000);
    onFocusAccordion(1);
    expect(result).toEqual(expectation[1]);

    // 6000ms spent on Second Accordion and focused to Third
    advanceBy(3000);
    onFocusAccordion(2);
    expect(result).toEqual(expectation[2]);

    // 3000ms spent on Third Accordion and focused to First & 3000ms spent on First
    advanceBy(3000);
    onFocusAccordion(0);
    expect(result).toEqual(expectation[3]);

    // another 3000ms spent on First Accordion but didn't focus to other accordion
    advanceBy(3000);

    getResult();
    expect(result).toEqual(expectation[4]);
    init();
    expect(result).toEqual(expectation[5]);

    advanceBy(3000);
    onFocusAccordion(3);
    expect(result).toEqual(expectation[6]);

    clear();
  });
});
