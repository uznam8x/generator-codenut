var gulp = require("gulp");
var fs = require("fs");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var sassGlob = require('gulp-sass-glob');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var nunjucksRender = require('gulp-nunjucks-render');
var rename = require('gulp-rename');
var prettify = require('gulp-prettify');
var data = require('gulp-data');
var renderer = require('vue-server-renderer').createRenderer();
var Vue = require('vue');
var component = require('./codenut.component.js');
var through = require('through2');
gulp.task('browser-sync', function() {
  browserSync.init({
    port: 3400,
    server: {
      baseDir: './app/prod'
    }
  });
});


gulp.task('compress', function() {
  return gulp.src(['./app/dev/javascript/**/*.js','./app/dev/component/**/*.js'])
    .pipe(concat('script.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(gulp.dest('app/prod/javascript'))
    .pipe(reload({stream: true}));
});

gulp.task('sass', function(){
  var option = {
    /*
    outputStyle :"expanded",
    /*/
    outputStyle :"compressed",
    //*/
    includePaths:["./node_modules/bootstrap/scss/", "./app/dev/stylesheet/"]
  };
  return gulp.src('./app/dev/stylesheet/**/*.scss')
    .pipe(sassGlob())
    .pipe(sass(option).on('error', sass.logError))
    .pipe(gulp.dest('./app/prod/stylesheet/'))
    .pipe(reload({stream: true}));
});

var manageEnvironment = function(environment) {
  environment.addGlobal('merge', function() {
    if( arguments.length < 2 ){
      return {}
    } else {
      var obj = {};
      for(var i = 0, len = arguments.length; i<len; i++){
        for(var key in arguments[i]){
          obj[ key ] = arguments[i][key];
        }
      }
      return obj;
    }
  });
};

var baseHTML = function( str ){
  var el = str
    .replace(/data\-server\-rendered="true"/g, '')
    .replace(/[a-z]+="\s*"/g, '')
    .replace(/<!---->/g, '')

    .replace(/<br(.*?)>/g, '<br$1/>')
    .replace(/<hr(.*?)>/g, '<hr$1/>');

  var mixed = function( attr, value ){
    var match = value.match( /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g);
    if( match !== null ){
      for(var i = 0, len = match.length; i<len; i++){
        var prop = match[i].replace(/'/g, "").replace(/"/g, "").split('=');
        attr[ prop[0] ] = prop[1];
      }
    }


    return attr;
  };
  var attribute = function( obj ){
    var prop = '';
    for(var key in obj){
      prop += key+'="'+obj[key]+'" ';
    }
    return prop;
  };

  el = el.replace(/<img[^>]*>/g, function( value ){
    return '<img {{attr}}/>'.replace("{{attr}}", attribute( mixed( { src:"", alt:"" }, value ) ));;
  });

  el = el.replace(/<input[^>]*>/g, function(value){
    return '<input {{attr}}/>'.replace("{{attr}}", attribute( mixed( { type:"text", name:"", value:"" }, value ) ));
  });
  el = el.replace(/<textarea[^>]*>/g, function(value){
    return '<textarea {{attr}}>'.replace("{{attr}}", attribute( mixed( { name:"", value:"" }, value ) ));
  });
  el = el.replace(/<select[^>]*>/g, function(value){
    return '<select {{attr}}>'.replace("{{attr}}", attribute( mixed( { name:"" }, value ) ));
  });
  el = el.replace(/<option[^>]*>/g, function(value){
    return '<option {{attr}}>'.replace("{{attr}}", attribute( mixed( { value:"" }, value ) ));
  });

  el = el.replace(/<iframe[^>]*>/g, function(value){
    return '<iframe {{attr}}>'.replace("{{attr}}", attribute( mixed( { src:"", frameBorder:"0" }, value ) ));
  });

  el = el.replace(/<main[^>]*>/g, function(value){
    return '<main {{attr}}>'.replace("{{attr}}", attribute( mixed( { role:"main" }, value ) ));
  });

  el = el.replace(/<button[^>]*>/g, function(value){
    return '<button {{attr}}>'.replace("{{attr}}", attribute( mixed( { type:"button" }, value ) ));
  });

  el = el.replace(/<a[^>]*>/g, function(value){
    return '<a {{attr}}>'.replace("{{attr}}", attribute( mixed( { href:"#" }, value ) ));
  });

  el = el.replace(/<form[^>]*>/g, function(value){
    return '<form {{attr}}>'.replace("{{attr}}", attribute( mixed( { name:"", method:"get", action:"" }, value ) ));
  });

  return el;
};

gulp.task('nunjucks', function() {

  return gulp.src('./app/dev/page/**/*.html')
    .pipe(data(function() {
      return {
        nav:require('./app/dev/model/nav.json'),
        util:{
          date:+new Date()
        }
      }
    }))
    .pipe(nunjucksRender({
      path: ['./app/dev/element'],
      manageEnv: manageEnvironment
    }))
    .pipe( through.obj(function(chunk, enc, callback){
      var html = chunk.contents.toString();
      html = html.replace(/\r\n|\t|\n|\s\s/g, '');
      var body = html.match(/<body[^>]*>((.|\n)*)<\/body>/gi)[0];
      renderer.renderToString(new Vue({
        template: body
      }), function(err, rendered)  {
        if(err) throw err;
        html = html.replace(/<body[^>]*>((.|\n)*)<\/body>/gi, baseHTML(rendered));

        chunk.contents = new Buffer(html, "utf8");
      } );
      this.push(chunk);
      callback();
    } ) )
    .pipe(prettify({
      indent_size: 2,
      unformatted: ['pre', 'code', 'xmp'],
      indent_inner_html: true
    }))
    .pipe(gulp.dest('./app/prod/page'))
    .pipe(reload({stream: true}));
});
gulp.task('watch', ['browser-sync', 'sass'], function(){
  gulp.watch('app/dev/**/*.+(html|nunjucks)', {cwd:'./'},['nunjucks']);
  gulp.watch('app/dev/model/**/*.json', {cwd:'./'},['nunjucks']);
  gulp.watch("app/dev/stylesheet/**/*.scss", {cwd:'./'},['sass']);
  gulp.watch("app/dev/component/**/*.scss", {cwd:'./'},['sass']);
  gulp.watch("app/dev/javascript/**/*.js", {cwd:'./'},['compress']);
  gulp.watch("app/dev/component/**/*.js", {cwd:'./'},['compress']);
});
gulp.task('breakpoint', function(){
  return gulp.src('./app/dev/stylesheet/base/_variables.scss')
    .pipe( through.obj(function(chunk, enc, callback){
      var variable = chunk.contents.toString();

      var match = variable.match(/\$grid-breakpoints:[\s]?\([^\}](.|\n)*?\)/g)[0];
      match = match.replace(/\r|\n|\s\s/g, '').match(/\([^\}]*(.*?)\)/g)[0];
      match = match.replace(/\(/g, '{').replace(/\)/g, '}').replace(/px/g, '');

      var script = '(function($){ window.Codenut = window.Codenut || {}; $.extend(Codenut, { breakpoint : '+match + '} ); })(jQuery);';
      chunk.contents = new Buffer(script, "utf8");
      this.push(chunk);
      callback();
    } ) )
    .pipe(rename({
      extname:'.js',
      basename: "breakpoint",
    }))
    .pipe(gulp.dest('./app/dev/javascript'))


});

gulp.task('default', ['browser-sync', 'breakpoint', 'sass', 'watch'], function(){
  gulp.start('nunjucks');
  gulp.start('sass');
  gulp.start('compress');
});
