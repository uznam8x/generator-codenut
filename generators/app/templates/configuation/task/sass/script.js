const gulp = require('gulp');
const sassGlob = require('gulp-sass-glob');
const sass = require('gulp-sass');
const option = {
  outputStyle: 'compressed', // expanded
  includePaths: [
    root + '/node_modules/codenut-style/scss/',
    root + '/app/dev/stylesheet/',
  ],
};

gulp.task('sass', () => {
    return gulp.src([root + '/app/dev/stylesheet/**/*.scss', root + '/app/dev/**/*.scss'])
      .pipe(sassGlob())
      .pipe(sass(option).on('error', (err) => {
        console.log(err);
      }))
      .pipe(gulp.dest(root + '/app/prod/stylesheet/'))
  }
);
