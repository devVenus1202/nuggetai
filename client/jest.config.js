const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?)$';

module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  testRegex: TEST_REGEX,
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['js', 'jsx'],
  collectCoverage: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/assetsTransformer.js',
    '\\.(css|scss)$': '<rootDir>/assetsTransformer.js'
  }
};
