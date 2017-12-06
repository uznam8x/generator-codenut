const glob = require('glob');
const path = require('path');
const load = (file) => {
  'use strict';
  for (let i = 0, len = file.length; i < len; i++) {
    require( path.relative(__dirname, file[i]) );
  }
};

glob(root + '/app/dev/nut/**/*.nut', { cwd: root }, (err, files) => {
    if (err) throw err;
    load(files);
  }
);

// TODO : component array list
/*
var address = {};
function setOption( target, prefix ){
  var options = target.options;
  console.log(options, prefix);
  for(var i = 0; i<options.length; i++){
    if( options[i].value !== '*' ){
      address[prefix+ options[i].value ] = options[i].text;
    }
  }
}

var type1 = document.getElementById('Type1');
var type2 = document.getElementById('Type2');
var type3 = document.getElementById('Type3');

setOption(type1, '');

var interval = null;
var cnt = 0;
var max = 0;
function add(){
  cnt++;
  if( cnt > max ){
    clearInterval(interval);
    return;
  }

  type2.value = type2.options[ cnt ].value;
  type2.dispatchEvent(new Event('change'));
  setTimeout( function(){
    setOption(type3, type1.value+type2.value);
  },300 );

}
function next(){
  setOption(type2, type1.value);
  cnt = 0;
  max = type2.options.length;
  interval = setInterval( add, 1000 );
}


for(var i = 1; i<type1.options; i++){
  type1.value = type1.options[i].value;
  type1.dispatchEvent(new Event('change'));
  setTimeout(setOption, 1000, type2, type1.value);

}
console.log( JSON.stringify(address, null, 4) );


var check = {
  type2:{
    crt:0,
    max:0,
  },
  type3:{
    crt:0,
    max:0,
  }
};
var interval = null;
function type2_in(){
  check.type2.crt++;
  var select = check.type2.crt;
  if( select > check.type2.max ){
    clearInterval(interval);
    console.log( JSON.stringify(address, null, 4) );
    return;
  }

  type1.value = type1.options[select].value;
  type1.dispatchEvent(new Event('change'));
  setTimeout(function(){
    setOption(type2, type1.value);
  },2000);
}

check.type2.max = type1.options.length -1;
interval = setInterval(type2_in, 3000);*/
