const fs = require('fs');
const Vue = require('vue');
const path = require('path');

Vue.component('skip', {
    props: ['type'],
    data: function () {
      'use strict';

      const data = JSON.parse(fs.readFileSync('./app/dev/model/skip.json', 'utf-8'));
      let skip = {};
      if (data.hasOwnProperty('skip')) {
        skip = data.skip;
      }

      return {
        model: skip,
      };
    },

    template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
  }
);
module.exports = this;
