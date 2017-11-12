const fs = require('fs');
const Vue = require('vue');
const path = require('path');

Vue.component('pagination', {
    template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
  }
);
module.exports = this;
