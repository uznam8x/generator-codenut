const fs = require('fs');
const Vue = require('vue');
const path = require('path');

Vue.component('imagery', {
    props: {
      width: {
        default: 320,
      },
      height: {
        default: 160,
      },
      backgroundColor: {
        default: 'eeeeee',
      },
    },
    template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
  }
);
module.exports = this;
