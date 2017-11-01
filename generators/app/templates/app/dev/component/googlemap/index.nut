var fs = require('fs');
var Vue = require('vue');
var path = require('path');

Vue.component('googlemap',{
    props:['lat', 'lng'],
    template:require('fs').readFileSync(path.resolve(__dirname, './template.html'), 'utf-8')
});
module.exports = this;