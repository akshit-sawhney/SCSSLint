var gulp        = require('gulp');

var postcss     = require('gulp-postcss');
var reporter    = require('postcss-reporter');
var syntax_scss = require('postcss-scss');
var stylelint   = require('stylelint');
var scssLintConfig = require('./gulp/scssLint').scssLintVar;
var sass = require('gulp-sass');

gulp.task('default', ['scss-lint', 'sass','watch']);

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

gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});