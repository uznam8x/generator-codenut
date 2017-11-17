const fs = require('fs');
const Vue = require('vue');
const path = require('path');

Vue.component('textfield', {
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
      placeholder: {
        default: '',
      },
      readonly: {
        default: false,
      }
    },
    template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
  }
);
module.exports = this;
