const fs = require('fs');
const path = require('path');

module.exports = {
  scrollbar: {
    props: {
      id:false,
    },
    template: path.resolve(__dirname, './template.html'),
  }
};
