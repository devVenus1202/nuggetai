import { json2Params } from '../helpers/url';
const APIKey = 'keyAYuXNZumm4ZvPD';

export const bubbleData = async params => {
  const response = await fetch(
    `https://api.airtable.com/v0/app3pWzn96sSKE6lP/general?maxRecords=3&view=Grid%20view`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${APIKey}`,
      },
    },
  );
  const data = await response.json();
  const bubbleData = [];
  for (let i = 1; i <= 4; i++) {
    bubbleData.push({
      label: data.records[0].fields[`Skill_${i}_name`],
      description: data.records[0].fields[`Skill_${i}_desc`],
      value: Number(data.records[0].fields[`Skill_${i}_relevance`]) * 100,
      color: data.records[0].fields[`Skill_${i}_color`],
      positions: [
        { name: 'Business Analyst', rank: 1 },
        { name: 'Product Manager', rank: 1 },
        { name: 'Sales Associate', rank: 1 },
      ],
    });
  }
  console.log(bubbleData);
  return bubbleData;
};
export const getSkillCategories = async params => {
  const response = await fetch(
    `https://api.airtable.com/v0/app3pWzn96sSKE6lP/general?maxRecords=3&view=Grid%20view`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${APIKey}`,
      },
    },
  );
  const data = await response.json();
  const categories = [];
  for (let i = 1; i <= 4; i++) {
    categories.push({
      label: data.records[0].fields[`Skill_${i}_name`],
      desc: data.records[0].fields[`Skill_${i}_desc`],
      relevance: data.records[0].fields[`Skill_${i}_relevance`],
      color: data.records[0].fields[`Skill_${i}_color`],
      candidate_avg: data.records[0].fields[`candidate_avg_${i}`],
      tp_avg: data.records[0].fields[`tp_avg_${i}`],
      value: i,
      checked: false,
    });
  }

  return categories;
};
