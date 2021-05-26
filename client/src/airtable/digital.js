import { json2Params } from '../helpers/url';
const APIKey = 'keyAYuXNZumm4ZvPD';

export const digitalList = async params => {
  const response = await fetch(
    `https://api.airtable.com/v0/app3pWzn96sSKE6lP/Digital?${json2Params(
      params,
    )}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${APIKey}`,
      },
    },
  );
  const data = await response.json();
  const candidates = [];
  data.records.forEach(item => {
    candidates.push({
      id: item.id,
      fullname: item.fields.FullName,
      rank: item.fields.Rank,
      email: item.fields.Email,
      skill_1: Number(item.fields.Skill_1_score),
      skill_2: Number(item.fields.Skill_2_score),
      skill_3: Number(item.fields.Skill_3_score),
      skill_4: Number(item.fields.Skill_4_score),
    });
  });
  return candidates;
};
