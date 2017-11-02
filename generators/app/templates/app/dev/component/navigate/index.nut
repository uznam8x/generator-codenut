var fs = require('fs');
var Vue = require('vue');
var path = require('path');

Vue.component('navigate-item',{
    props: ['model'],
    template:fs.readFileSync(path.resolve(__dirname, './item.html'), 'utf-8')
});
Vue.component('navigate',{
    props:['type'],
    data:function(){
        var nav = JSON.parse( fs.readFileSync('./app/dev/model/nav.json', 'utf-8') );
        return {
            model:nav[this.type]
        }

    },
    template:fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8')
});
module.exports = this;
