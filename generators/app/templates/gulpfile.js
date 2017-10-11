var gulp = require("gulp");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var sassGlob = require('gulp-sass-glob');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var nunjucksRender = require('gulp-nunjucks-render');
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
        var string = rendered.replace(/data\-server\-rendered="true"/g, '').replace(/<input(.*?)>/g, '<input$1/>');
        string = string.replace(/[a-z]+="\s*"/g, '');
        string = string.replace(/<!---->/g, '');
        html = html.replace(/<body[^>]*>((.|\n)*)<\/body>/gi, string);

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

gulp.task('default', ['browser-sync', 'sass', 'watch'], function(){
  gulp.start('nunjucks');
  gulp.start('sass');
  gulp.start('compress');
});
