import {
  result,
  addDeletedCount,
  addWriteWithin3s,
  calcMaxWordsWithin30s,
  calcAverageWaiting,
  calcAverageWroteAfter3s,
  sectionBlurred,
  sectionFocused
} from '../RevisionEvent';

describe('Event - RevisionEvent Test', () => {
  test('addDeletedCount method should store deleted count for each section', () => {
    const testInput = [0, 0, 0, 1, 1, 2, 3, 0];

    const expectations = [{ '0': 4, '1': 2, '2': 1, '3': 1 }];

    testInput.map(val => {
      addDeletedCount(val);
    });

    expect(result.deletionCount).toEqual(expectations[0]);
  });

  test('addWriteWithin3s method should store written count after 3s occured after delete', () => {
    const testInput = [0, 0, 0, 1, 1, 2, 3, 0];

    const expectations = [{ '0': 4, '1': 2, '2': 1, '3': 1 }];

    testInput.map(val => {
      addWriteWithin3s(val);
    });

    expect(result.writeWithin3s).toEqual(expectations[0]);
  });

  test('calcMaxWordsWithin30s method should calculate max words written within 30s for each section', () => {
    const testInput = [[0, 10], [1, 5], [0, 7], [0, 15], [1, 10], [3, 10]];

    const expectation = { '0': 15, '1': 10, '3': 10 };

    testInput.map(val => {
      calcMaxWordsWithin30s(val[0], val[1]);
    });

    expect(result.maxWordsWithin30s).toEqual(expectation);
  });

  test('calcAverageWaiting method should calculate average waiting time for each section', () => {
    const testInput = [
      [0, 100],
      [1, 500],
      [0, 70],
      [0, 150],
      [1, 100],
      [3, 100]
    ];

    const expectation = {
      '0': { avg: 0.05, count: 3, total: 0.1 },
      '1': { avg: 0.25, count: 2, total: 0.5 },
      '3': { avg: 0.1, count: 1, total: 0.1 }
    };

    testInput.map(val => {
      calcAverageWaiting(val[0], val[1]);
    });

    expect(result.averageWaiting).toEqual(expectation);
  });

  test('calcAverageWroteAfter3s method should calculate average waiting time for each section', () => {
    const testInput = [
      [0, 100],
      [1, 500],
      [0, 70],
      [0, 150],
      [1, 100],
      [3, 100]
    ];

    const expectation = {
      '0': { avg: 106.65, count: 3, total: 320 },
      '1': { avg: 300, count: 2, total: 600 },
      '3': { avg: 100, count: 1, total: 100 }
    };

    testInput.map(val => {
      calcAverageWroteAfter3s(val[0], val[1]);
    });

    expect(result.averageWroteAfter3s).toEqual(expectation);
  });

  test('sectionBlurred method should set focus out for each section', () => {
    const testInput = [0, 1, 2];

    const expectation = {
      '0': 'FOCUS_OUT',
      '1': 'FOCUS_OUT',
      '2': 'FOCUS_OUT'
    };

    testInput.map(val => {
      sectionBlurred(val);
    });

    expect(result.focusReturned).toEqual(expectation);
  });

  test('focusReturned method should set focus in for each section', () => {
    const testInput = [0, 1, 2];

    const expectation = {
      '0': 'FOCUS_RETURN',
      '1': 'FOCUS_RETURN',
      '2': 'FOCUS_RETURN'
    };

    testInput.map(val => {
      sectionFocused(val);
    });

    expect(result.focusReturned).toEqual(expectation);
  });
});
