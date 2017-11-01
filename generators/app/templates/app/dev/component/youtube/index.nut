var fs = require('fs');
var Vue = require('vue');
var path = require('path');

Vue.component('youtube',{
    props:['vid'],
    template:require('fs').readFileSync(path.resolve(__dirname, './template.html'), 'utf-8')
});
module.exports = this;