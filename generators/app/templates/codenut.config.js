const glob = require('glob');
const path = require('path');
const load = (file) => {
  'use strict';
  for (let i = 0, len = file.length; i < len; i++) {
    require(path.resolve(__dirname, file[i]));
  }
};

glob(__dirname + '/app/dev/nut/**/*.nut', (err, files) => {
    if (err) throw err;
    load(files);
  }
);

module.exports = {
  load: load,
};
