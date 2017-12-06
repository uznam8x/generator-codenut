const gulp = require('gulp');
const webpack = require('webpack-stream');
gulp.task('webpack', () => gulp.src(root + '/app/dev/javascript/codenut.js')
  .pipe(webpack(require(root + '/webpack.config.js')))
  .pipe(gulp.dest(root + '/app/prod/javascript'))
);
