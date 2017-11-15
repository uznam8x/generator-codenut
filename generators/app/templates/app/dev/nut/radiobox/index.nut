const fs = require('fs');
const Vue = require('vue');
const path = require('path');

Vue.component('radiobox', {
    props: {
      name: {
        default: '',
      },
      value: {
        default: '',
      },
      title: {
        default: '',
      },
      checked: {
        default: false,
      }
    },
    template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
  }
);
module.exports = this;
