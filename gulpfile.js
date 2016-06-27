'use strict' ;
var gulp = require('gulp'),
    sassLint = require('gulp-sass-lint'),
    sass = require('gulp-sass');

gulp.task("sass-lint", function() {
  gulp.src(['./scss/**/*.s+(a|c)ss','!scss/_normalize.scss'])
    .pipe(sassLint({
      options: {
        formatter: 'stylish'
      },
      rules: {
        'class-name-format': {
          'convention': 'hyphenatedbem'
        }
      }
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('sass', function () {
  return gulp.src('./scss/main.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass','sass-lint']);
});

// Default task
gulp.task('default', ['sass:watch']);
