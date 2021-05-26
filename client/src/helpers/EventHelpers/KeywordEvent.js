import { countStringIncluded } from '../../helpers/dataHelper';

export let total = 0;
export let result = {};
export let totalKeywords = {};


export const addKeywordCount = (keyword, text, sectionId) => {
  const count = countStringIncluded(text, keyword);

  if (totalKeywords[sectionId] === undefined) {
    totalKeywords[sectionId] = 0;
  }
  if (totalKeywords['total'] === undefined) {
    totalKeywords['total'] = 0;
  }
  if (result[sectionId] === undefined) {
    result[sectionId] = {};
  }
  if (result[sectionId][keyword] === undefined) {
    result[sectionId][keyword] = 0;
  }
  result[sectionId][keyword] += count;
  totalKeywords[sectionId] += count;
  totalKeywords['total'] += count;
};

export const addKeyword = keyword => {
  if (result['keywords'] === undefined) {
    result['keywords'] = '';
  }
  result['keywords'] += `${keyword}. `;
};

export const onKeywordsEvent = (event_id, sendEvent) => {
  console.log('keywordcount event : ', result);

  return sendEvent({
    event_id,
    data: {
      event_type: 'keyword_count_event',
      data: result,
    },
  });
};

export const onTotalKeywordsEvent = (event_id, sendEvent) => {
  console.log('keyword total count event : ', total);

  return sendEvent({
    event_id,
    data: {
      event_type: 'total_keyword_event',
      data: totalKeywords,
    },
  });
};
