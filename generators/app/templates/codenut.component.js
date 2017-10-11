var glob = require("glob");
glob("app/dev/component/**/*.nut", {cwd:'./'}, function (err, files) {
  if( err ){
    throw err;
  }
  for(var i = 0, len = files.length; i<len; i++){
    require('./'+files[i]);
  }
});
module.exports = this;
