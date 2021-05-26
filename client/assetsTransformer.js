const path = require('path');

// noinspection JSUnusedGlobalSymbols
module.exports = {
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  }
};
