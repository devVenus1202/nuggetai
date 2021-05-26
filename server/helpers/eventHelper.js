const Event = require('../models/event');
const _ = require('lodash');
const getNaturalLangUnderstanding = require('../controllers/waston/NaturalLangUnderstanding');
const personalityInsights = require('../controllers/waston/PersonalityInsights')
  .getJSON;
const toneAnalyzer = require('../controllers/waston/ToneAnalyzer');
const personalityInsightsCSV = require('../controllers/waston/PersonalityInsights')
  .getCSV;

exports.deleteEvent = function(event_id) {
  Event.deleteOne(
    {
      _id: event_id,
    },
    function(err) {
      if (err) {
        return err;
      } else {
        return 'success';
      }
    },
  );
};

const _storeEvent = async (event_id, event_type, event_data) => {
  const event = await Event.update(
    { _id: event_id },
    { $push: { events: { type: event_type, data: event_data } } },
  );

  return event;
};

const storeEvent = async (event_id, event_type, event_data) => {
  return new Promise(resolve => {
    Event.findOne({ _id: event_id }, (err, event) => {
      if (!event) resolve(false);
      if (err) resolve(false);

      let newEvent = event.events;
      newEvent[event_type] = event_data;
      Event.update({ _id: event_id }, { events: newEvent }, (err, res) => {
        if (!res) resolve(false);
        if (err) resolve(false);
        resolve(true);
      });
    });
  });
};

const storeDataEvent = (eventId, eventType, sectionId) => async (
  success,
  data,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let event = await Event.findOne({ _id: eventId });
      if (!success) {
        let newData = {};
        newData[sectionId] = 'error';
        event.events[eventType] = Object.assign(
          {},
          event.events[eventType],
          newData,
        );
      } else {
        let newData = {};
        newData[sectionId] = data;
        event.events[eventType] = Object.assign(
          {},
          event.events[eventType],
          newData,
        );
      }
      event.markModified('events');
      await event.save();
      resolve();
    } catch (error) {
      reject();
    }
  });
};

exports.writeEvent = async function(event_id, event_type, event_data) {
  if (event_type === 'section_data_event') {
    const { text, lang = 'en' } = event_data;

    try {
      const res = await getNaturalLangUnderstanding(text);
      await storeEvent(event_id, 'natural_language_understanding', res);
    } catch (error) {
      await storeEvent(event_id, 'natural_language_understanding', {});
    }

    try {
      const res = await personalityInsights(text, lang);
      await storeEvent(event_id, 'personality_insights', res);
    } catch (error) {
      await storeEvent(event_id, 'personality_insights', {});
    }

    try {
      const res = await toneAnalyzer(text);
      await storeEvent(event_id, 'tone_analyzer', res);
    } catch (error) {
      await storeEvent(event_id, 'tone_analyzer', {});
    }
  }
  const event = await storeEvent(event_id, event_type, event_data);
  return event;
};

const getSectionText = async event_id => {
  const data = await Event.findOne({ _id: event_id });
  return _.get(data, 'events.section_data_event.text', '');
};

const PERSONALITY = 'personality';
const NATURAL_LANG = 'natural_lang';
const TONE_ANALYZER = 'tone_analyzer';

const sectionNames = [
  {
    name: 'problem',
    field: 'Problem-0',
  },
  {
    name: 'collect_information',
    field: 'Collect Information-1',
  },
  {
    name: 'ideas',
    field: 'Ideas-2',
  },
  {
    name: 'solution',
    field: 'Solution-3',
  },
];

exports.getWastonCSV = async (event_id, waston_type) => {
  try {
    const sectionText = await getSectionText(event_id);
    let resultCSV = [];
    if (sectionText) {
      resultCSV = await personalityInsightsCSV(sectionText);
      // await Promise.all(
      //   sectionNames.map(async (sectionName, index) => {
      //     const sectionUid = sectionName.name;
      //     const sectionId = sectionName.field;

      //     const text = sectionText[sectionId];
      //     if (text) {
      //       switch (waston_type) {
      //         case PERSONALITY:
                
      //           break;
      //         default:
      //           resultCSV[sectionUid] = null;
      //       }
      //     } else {
      //       resultCSV[sectionUid] = null;
      //     }
      //   }),
      // );
      return resultCSV;
    }
  } catch (error) {
    console.log('getwastoncsv error: ', error);
  }

  return null;
};
