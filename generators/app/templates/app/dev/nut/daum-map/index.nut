const fs = require('fs');
const Vue = require('vue');
const path = require('path');

Vue.component('daum-map', {
    props: {
      lat: {
        default: 37.566657,
      },
      lng: {
        default: 126.978411,
      },
      zoom: {
        default: 3,
      },
    },

    template: fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8'),
    created: function () {
      'use strict';
      let attr = this._self.$attrs;
      const data = this.$options.propsData;
      const prop = this._props;

      for (let key in prop) {
        if (data.hasOwnProperty(key)) {
          attr['data-' + key] = data[key];
        } else {
          attr['data-' + key] = prop[key];
        }
      }
    },
  }
);
module.exports = this;
