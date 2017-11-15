const fs = require('fs');
const Vue = require('vue');
const path = require('path');

Vue.component('selectbox', {
    props: {
      name: {
        default: '',
      },
      multiple: {
        default: false,
      },
    },
    template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
  }
);
module.exports = this;
