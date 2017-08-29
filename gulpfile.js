var gulp = require('gulp');
var postcss = require('gulp-postcss');
var reporter = require('postcss-reporter');
var syntax_scss = require('postcss-scss');
var stylelint = require('stylelint');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var scssLintConfig = require('./gulp/scssLint').scssLintVar;
var package = require('./package.json');

gulp.task('default', ['clean-scripts', 'scss-lint', 'sass','watch']);

gulp.task("scss-lint", function() {

  // Stylelint config rules
  var stylelintConfig = scssLintConfig;

  var processors = [
    stylelint(stylelintConfig),
    reporter({
      clearMessages: true,
      throwError: true
    })
  ];

  return gulp.src(
      ['./scss/**/*.scss']
    )
    .pipe(postcss(processors, {syntax: syntax_scss}));
});

gulp.task('sass', ['clean-scripts'], function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ suffix: '?v' + package.version }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('clean-scripts', function () {
  return gulp.src('dist/*.css', {read: false})
    .pipe(clean());
});