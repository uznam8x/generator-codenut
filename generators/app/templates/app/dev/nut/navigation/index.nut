const fs = require('fs');
const Vue = require('vue');
const path = require('path');
const _ = require('lodash');

Vue.component('navigation-item', {
    props: {
      model: {
        default: {}
      },
      nid: {
        default: null,
      },
      activate: {
        default: null,
      }
    },
    data: function () {
      return {
        selected: false,
      }
    },
    template: fs.readFileSync(path.resolve(__dirname, './item.html'), 'utf-8'),
    created: function () {
      'use strict';
      if (this.activate !== null) {
        let xid = String(this.activate).trim().split(','); // 2
        let sid = String(this.nid).trim().split(','); // 1

        let chk = [];
        _.each(sid, (value, index) => {
          chk.push( xid[index] === value );
        });

        let fillter = chk.filter((value)=>{
          return value === false;
        });

        if( chk.length && !fillter.length ){
          this._data.selected = true;
        }
      }
    }
  }
);

Vue.component('navigation', {
    props: {
      type: {
        default: '',
      },
      activate: {
        default: null,
      },
    },
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
