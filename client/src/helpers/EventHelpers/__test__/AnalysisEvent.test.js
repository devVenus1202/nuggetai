import {
  splitToWords,
  isLongSentence,
  getOnlyLetters,
  getWordCount,
  countStringIncluded,
  countLongSentences,
  countPassiveVoices,
  countPronouns,
  countWordsInCollect,
  countWordsInEngender,
  result
} from '../AnalysisEvent';

const testInputs = [
  "If you feel that the React documentation goes at a faster pace"
  +" than you’re comfortable with, check out this overview of React by Tania Rascia." 
  +"It is introduced the most important React concepts in a detailed, beginner-friendly way, "
  +"Once you’re done, give the documentation another try, the React documentation assumes some "
  +"familiarity with programming in the JavaScript language\n",

  "To be mindful of our thoughts, instead of stuck in a subconscious state, is a good reason"
  +" to avoid reacting to life’s events Mindfulness engages us to be present and inhabit our"
  +" body with intention and receptivity. We let go of expecting life to unfold in a particular"
  +" way and accept what shows up to embrace it with curiosity. If we are irritated by life’s "
  +"events and react to it, we reinforce our suffering. Consider this: Do you want to be right"
  +" or do you want to be happy? In the film Anna and The King, Prince Chulalongkorn played by"
  +" actor Keith Chin declares to Anna Leonowens, played by Jodie Foster: “It is always surprising "
  +"how small a part of life is taken up by meaningful moments. Most often they’re over before "
  +"they start even though they cast a light on the future and make the person who originated"
  +" them unforgettable.",

  "Likewise, being of service to others fosters meaningful moments In donating our time "
  +"and self, he enhance our life through altruistic deeds Similarly, she must adopt the "
  +"right mindset to become attuned to such moments, instead of dismissing them as unimportant. "
  +"Or else her, we fail to miss out on wonderful experiences obscured as otherwise ordinary "
  +"moments. He the Master reminds them in the opening passage, rather than speculate on reality "
  +"we must embody it Meaningful moments are a fabric of everyday life, "
  +"masquerading as familiar events. Don’t let them be passed you by.",

  "Count number of times each word is included...similarly, equally, in the same way, "
  +"likewise, by the same token, in a like manner (similarity - additive transitions); "
  +"even more, above all, indeed, more importantly, besides",

  "Count number of times each word is included but, however, in contrast, by way of contrast, "
  +"(and) yet, when in fact, while, whereas, conversely, on the other hand, though, still; on "
  +"the contrary (conflict - adversative transitions); but even so, however, nevertheless, "
  +"nonetheless, although, though, even though, despite (this), in spite of (this), granted "
  +"(this), on the other hand, notwithstanding (this), regardless (of this), be that as it may, "
  +"admittedly, albeit",
];

const expectations = {
  longSentences: {"0": 1, "1": 2, "2": 2, "3": 0, "4": 1},
  pronouns: {"0": {"it": 1}, 
    "1": {"it": 3, "them": 1, "they": 3}, 
    "2": {"he": 2, "her": 1, "it": 1, "she": 1, "them": 3}, 
    "3": {}, 
    "4": {"it": 1}
  },
  passive_voices: {"0": 1, "1": 2, "2": 2, "3": 0, "4": 1},
  collectionWords: {"likewise": 1, "similarly": 1},
  engenderWords: {"admittedly": 1, "albeit": 1, "although": 1, "be that as it may": 1, 
  "but": 2, "but even so": 1, "by way of contrast": 1, "conversely": 1, 
  "despite": 1, "even though": 1, "granted": 1, "however": 4, "in contrast": 1, 
  "in spite of": 1, "nevertheless": 1, "nonetheless": 1, "on the contrary": 1, 
  "on the other hand": 4, "regardless": 1, "still": 1, "though": 8, 
  "when in fact": 1, "whereas": 1, "while": 1, "yet": 1}
};


describe("Event - AnalysisEvent Test", () => {

  test('splitToWords method should split sentences to words ', () => {
    const testInput = "If you feel that the React docume.ntation goes at a faster pace";
    const output = ["If", "you", "feel", "that", "the", "React", "docume.ntation", "goes", "at", "a", "faster", "pace"];
    expect(splitToWords(testInput)).toEqual(output);
  });

  test('getOnlyLetters method should return only letters ', () => {
    const testInput = ".If you feel th#at the Re_?act docume.ntation goes... at a faster pace.";
    const output = ["If", "you", "feel", "th", "at", "the", "Re", "act", "docume", "ntation", "goes", "at", "a", "faster", "pace"];
    expect(getOnlyLetters(testInput)).toEqual(output);
  });

  test('countStringIncluded method should return if main string includes sub string ', () => {
    const main_str = ".If you feel th#at the Re_?act docume.ntation goes... at a faster pace.";
    const sub_str = "tion goes"
    const output = 1;
    expect(countStringIncluded(main_str, sub_str)).toEqual(output);
  });
  
  test('isLongSentence method should return if wordcounts larger than 30 ', () => {
    const testInput = "If you feel that the React docume.ntation goes at a faster pace"
                    +"If you feel that the React documentation goes at a faster pace"
                    +"If you feel that the React documentation goes at a faster pace";
    const output = true;
    expect(isLongSentence(testInput)).toEqual(output);
  });

  test('getWordCount method should return word counts ', () => {
    const testInput = "abc.def,abc abc a.bc acb a b c a_bc";
    const output = 3;
    expect(getWordCount(testInput, "abc")).toEqual(output);
  });

  test('countLongSentences method should return the times of Long sentences ', () => {
    testInputs.map((text, index) => {
      countLongSentences(index, text);
    });
    expect(result.longSentences).toEqual(expectations.longSentences);
  });

  test('countPronouns method should return the times of pronouns ', () => {
    testInputs.map((text, index) => {
      countPronouns(index, text);
    });
    expect(result.pronouns).toEqual(expectations.pronouns);
  });

  test('countPassiveVoices method should return the times of passive voices ', () => {
    testInputs.map((text, index) => {
      countPassiveVoices(index, text);
    });
    expect(result.passive_voices).toEqual(expectations.passive_voices);
  });

  test('countWordsInCollect method should return the times of words in Collect Section ', () => {
    countWordsInCollect(testInputs[2]);

    expect(result.collectionWords).toEqual(expectations.collectionWords);
  });

  test('countWordsInEngender method should return the times of words in Engender Section ', () => {
    countWordsInEngender(testInputs[4]);

    expect(result.engenderWords).toEqual(expectations.engenderWords);
  });

});
