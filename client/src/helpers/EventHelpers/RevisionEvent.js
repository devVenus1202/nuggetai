import { ms2s, toFixedPoint } from '../dataHelper';

const initialResult = {
  deletionCount: {},
  writeWithin3s: {},
  maxWordsWithin30s: {},
  averageWaiting: {},
  averageWroteAfter3s: {},
  focusReturned: {},
  totalRevision: {},
};

export let result = initialResult;

export const addDeletedCount = sectionId => {
  if (result.deletionCount[sectionId] === undefined) {
    result.deletionCount[sectionId] = 0;
  }
  result.deletionCount[sectionId]++;
};

export const addWriteWithin3s = sectionId => {
  if (result.writeWithin3s[sectionId] === undefined) {
    result.writeWithin3s[sectionId] = 0;
  }
  result.writeWithin3s[sectionId]++;
};

export const getQuickFix = () => {
  const data = result.writeWithin3s;

  let total = 0;

  Object.keys(data).forEach((key, ind) => {
    total += data[key];
  });

  return total;
};

export const calcMaxWordsWithin30s = (sectionId, count) => {
  if (result.maxWordsWithin30s[sectionId] === undefined) {
    result.maxWordsWithin30s[sectionId] = count;
  } else if (count > result.maxWordsWithin30s[sectionId]) {
    result.maxWordsWithin30s[sectionId] = count;
  }
};
export const calcAverageWaiting = (sectionId, interval) => {
  interval = ms2s(interval);
  if (result.averageWaiting[sectionId] === undefined) {
    result.averageWaiting[sectionId] = parseFloat(interval);
  } else {
    const current = result.averageWaiting[sectionId];
    result.averageWaiting[sectionId] += parseFloat(interval);
  }
};

// export const calcAverageWaiting = (sectionId, interval) => {
//   interval = ms2s(interval);
//   if (result.averageWaiting[sectionId] === undefined) {
//     result.averageWaiting[sectionId] = {
//       total: parseFloat(interval),
//       count: 1,
//       avg: parseFloat(interval)
//     };
//   } else {
//     const current = result.averageWaiting[sectionId];
//     result.averageWaiting[sectionId] = {
//       total: parseFloat(current.total + interval),
//       count: current.count + 1,
//       avg: toFixedPoint(
//         parseFloat(current.total + interval) / (current.count + 1),
//         2
//       )
//     };
//   }
// };

export const calcAverageWroteAfter3s = (sectionId, wrote) => {
  if (result.averageWroteAfter3s[sectionId] === undefined) {
    result.averageWroteAfter3s[sectionId] = wrote;
  } else {
    const current = result.averageWroteAfter3s[sectionId];
    result.averageWroteAfter3s[sectionId] += wrote;
  }
};

const FOCUS_OUT = 'FOCUS_OUT';
const FOCUS_RETURN = 'FOCUS_RETURN';

export const sectionBlurred = sectionId => {
  result.focusReturned[sectionId] = FOCUS_OUT;
};

export const sectionFocused = sectionId => {
  result.focusReturned[sectionId] = FOCUS_RETURN;
};

export const clickSection = sectionId => {
  if (result.totalRevision[sectionId] === undefined) {
    result.totalRevision[sectionId] = -1;
  }

  result.totalRevision[sectionId]++;
};

export const onSendRevisionEvent = (event_id, sendEvent) => {
  // Object.keys(result.deletionCount).map(key => {
  //   if (result.averageWroteAfter3s[key]) {
  //     result.totalRevision[key] = toFixedPoint(
  //       result.deletionCount[key] / result.averageWroteAfter3s[key].avg,
  //       2
  //     );
  //   }
  // });

  console.log('Revision Data : ', result);

  return sendEvent({
    event_id,
    data: {
      event_type: 'revision_data_event',
      data: result,
    },
  });

  result = initialResult;
};
