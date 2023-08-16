const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "fs": false,
      "os": false,
      "path": false,
    },
  },
};