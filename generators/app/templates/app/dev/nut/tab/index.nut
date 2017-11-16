const fs = require('fs');
const Vue = require('vue');
const path = require('path');

Vue.component('tab', {
    template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
    beforeCreate: function () {
      'use strict';

      if (this.$slots.hasOwnProperty('menu')) {
        let data = this.$slots.menu[0].data;
        let staticClass = (data.staticClass ? ' ' + data.staticClass : '');
        data.staticClass = 'tab__menu' + staticClass;
      }

      if (this.$slots.hasOwnProperty('content')) {
        let data = this.$slots.content[0].data;
        let staticClass = (data.staticClass ? ' ' + data.staticClass : '');
        data.staticClass = 'tab__content' + staticClass;
      }
    },
  }
);

module.exports = this;
