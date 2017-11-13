const glob = require('glob');
const load = (file) => {
  'use strict';
  for (let i = 0, len = file.length; i < len; i++) {
    require('./' + file[i]);
  }
};

glob('app/dev/nut/**/*.nut', { cwd: './' }, (err, files) => {
    if (err) {
      throw err;
    }

    load(files);
  }
);

// TODO : component array list
module.exports = this;
