const fs = require('fs');
const Vue = require('vue');
const path = require('path');

Vue.component('navigation-item', {
    props: ['model'],
    template: fs.readFileSync(path.resolve(__dirname, './item.html'), 'utf-8'),
  }
);

Vue.component('navigation', {
    props: ['type'],
    data: function () {
      const nav = JSON.parse(fs.readFileSync('./app/dev/model/nav.json', 'utf-8'));
      return {
        model: nav[this.type],
      };
    },

    template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
  }
);
module.exports = this;
