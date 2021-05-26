export const eventFields = [
  {
    name: 'time_spent_event', // 1
    field: 'time_spent_event',
  },
  {
    name: 'card_timer_event_1',
    field: 'card_timer_event.1',
    type: 'value',
  },
  {
    name: 'card_timer_event_2',
    field: 'card_timer_event.2',
    type: 'value',
  },
  {
    name: 'card_timer_event_3',
    field: 'card_timer_event.3',
    type: 'value',
  },
  {
    name: 'card_timer_event_4',
    field: 'card_timer_event.4',
    type: 'value',
  },
  {
    name: 'card_timer_event_5',
    field: 'card_timer_event.5',
    type: 'value',
  },
  {
    name: 'card_keywords',
    field: 'keyword_count_event.keywords',
    type: 'value',
  },
  {
    name: 'card_keywords_count',
    field: 'total_keyword_event.total',
    type: 'value',
  },
  {
    name: 'card_keywords_count_in',
    field: 'total_keyword_event',
  },
  {
    name: 'drag_count_event', // 4
    field: 'drag_event.dragCount',
  },
  {
    name: 'dragged_word_count_event', // 5
    field: 'drag_event.wordCount',
  },
  {
    name: 'first_word_typing_event', // 8
    field: 'first_word_event',
  },
  {
    name: 'time_maximization_event', // 11
    field: 'calc_timer_event',
    type: 'value',
  },
  {
    name: 'revision_numberofDeletedStrokes_event', // 13
    field: 'revision_data_event.deletionCount',
  },
  {
    name: 'revision_numberOfWritingWithin3sDeleting_event', // 14
    field: 'revision_data_event.writeWithin3s',
  },
  {
    name: 'revision_averageWaitingBetweenDeleteWrite_event', // 16
    field: 'revision_data_event.averageWaiting',
  },
  {
    name: 'revision_AvgWordsEnteredAfterDeleteBeforePauseLargerthan3s_event', // 17
    field: 'revision_data_event.averageWroteAfter3s',
  },
  {
    name: 'revision_totalRevision_event', // 21
    field: 'revision_data_event.totalRevision',
  },
  {
    name: 'analysis_long_sentence_event', // 22
    field: 'analysis_event.longSentences',
  },
  {
    name: 'analysis_pronouns_event', // 23
    field: 'analysis_event.pronouns',
  },
  {
    name: 'analysis_phrase1_event',
    field: 'analysis_event.phrase1',
  },
  {
    name: 'analysis_phrase2_event',
    field: 'analysis_event.phrase2',
  },
  {
    name: 'analysis_phrase3_event',
    field: 'analysis_event.phrase3',
  },
  {
    name: 'analysis_phrase4_event',
    field: 'analysis_event.phrase4',
  },
  {
    name: 'analysis_be_verbs_event', // 24
    field: 'analysis_event.beverbs',
  },
  {
    name: 'word_count_event', //
    field: 'word_count_event',
  },
  {
    name: 'help_view_count_event',
    field: 'help_view_count_event',
    type: 'value',
  },
  {
    name: 'section_data_event', //
    field: 'section_data_event.text',
  },
  {
    name: 'wild_card_event_label', //
    field: 'wild_card_event.label',
    type: 'value',
  },
  {
    name: 'wild_card_event_value', //
    field: 'wild_card_event.value',
    type: 'value',
  },
  {
    name: 'wild_card_event_description', //
    field: 'wild_card_event.description',
    type: 'value',
  },
  {
    name: 'wild_card_event_content', //
    field: 'wild_card_event.content',
    type: 'value',
  },
  {
    name: 'wild_card_event_time', //
    field: 'wild_card_event.time',
    type: 'value',
  },
];

export const waston = [
  {
    name: 'natural_language_understanding', //
    field: 'natural_language_understanding',
  },
  {
    name: 'personality_insights', //
    field: 'personality_insights',
  },
  {
    name: 'tone_analyzer', //
    field: 'tone_analyzer',
  },
];

export const natural_language_understanding_fields = [
  {
    name: 'usage_text_utils',
    field: 'usage.text_units',
  },
  {
    name: 'usage_text_characters',
    field: 'usage.text_characters',
  },
  {
    name: 'usage_features',
    field: 'usage.features',
  },
  {
    name: 'keywords_from_section',
    field: 'keywords',
    type: 'keyword',
  },
  {
    name: 'categories_score',
    field: 'categories.0.score',
  },
  {
    name: 'categories_label',
    field: 'categories.0.label',
  },
  {
    name: 'concepts_text',
    field: 'concepts.0.text',
  },
  {
    name: 'concepts_relevance',
    field: 'concepts.0.relevance',
  },
  {
    name: 'concepts_dbpedia_resource',
    field: 'concepts.0.dbpedia_resource',
  },
  {
    name: 'emotion_document_emotion_sadness',
    field: 'emotion.document.emotion.sadness',
  },
  {
    name: 'emotion_document_emotion_joy',
    field: 'emotion.document.emotion.joy',
  },
  {
    name: 'emotion_document_emotion_fear',
    field: 'emotion.document.emotion.fear',
  },
  {
    name: 'emotion_document_emotion_disgust',
    field: 'emotion.document.emotion.disgust',
  },
  {
    name: 'emotion_document_emotion_anger',
    field: 'emotion.document.emotion.anger',
  },
  {
    name: 'sentiment_document_score',
    field: 'sentiment.document.score',
  },
  {
    name: 'sentiment_document_label',
    field: 'sentiment.document.label',
  },
];

export const tone_analyzer_fields = [
  {
    name: 'document_tones_count',
    field: 'document_tone.tones',
  },
  {
    name: 'sentences_tones_count',
    field: 'sentences_tone',
  },
];

export const pipelineFields = [
  {
    name: 'id',
    field: 'challenge_id',
  },
  {
    name: 'benchmark',
    field: 'benchmark',
  },
  {
    name: 'title',
    field: 'title',
  },
  {
    name: 'pipeline_description',
    field: 'pipeline_desc',
  },
  {
    name: 'created_at',
    field: 'createdAt',
  },
];

export const userFields = [
  {
    name: 'email',
    field: 'email',
  },
  {
    name: 'full_name',
    field: 'firstname',
  },
  {
    name: 'age',
    field: 'age',
  },
  {
    name: 'gender',
    field: 'gender',
  },
  {
    name: 'role_function',
    field: 'roleFunction',
  },
  {
    name: 'role_level',
    field: 'roleLevel',
  },
  {
    name: 'recommendScore',
    field: 'recommendScore',
  },
  {
    name: 'reason_recommendScore',
    field: 'reasonRecommendScore',
  },
  {
    name: 'content_score',
    field: 'contentScore',
  },
  {
    name: 'reason_contentScore',
    field: 'reasonContentScore',
  },
  {
    name: 'feedback',
    field: 'feedback',
  },
  {
    name: 'email_address',
    field: 'emailAddress',
  },
  {
    name: 'ethnicity',
    field: 'ethnicity',
  },
  {
    name: 'marital',
    field: 'marital',
  },
  {
    name: 'degree',
    field: 'degree',
  },
  {
    name: 'employment',
    field: 'employment',
  },
  {
    name: 'advice',
    field: 'advice',
  },
];

export const eventInfoFields = [
  {
    name: 'event_id',
    field: '_id',
  },
  {
    name: 'event_created_at',
    field: 'createdAt',
  },
  {
    name: 'event_updated_at',
    field: 'updatedAt',
  },
];

export const sections = [
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
